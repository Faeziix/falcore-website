import {
  fullscreenVertexShaderSource,
  createSmokeDitheringFragmentShaderSource,
} from "./dithering-shader-sources";
import { ditheringTuning, type DitheringPreset } from "./dithering-tuning";
import { createSmokeFlowPass, type SmokeStroke } from "./create-smoke-flow-pass";
import type { RgbaColor } from "./read-css-color-token";
import { createFullscreenTriangle, linkProgram, readUniformLocations } from "./webgl-program";

export interface DitheringPalette {
  ink: RgbaColor;
  backdrop: RgbaColor;
}

export interface DitheringFrame {
  time: number;
  deltaSeconds: number;
  stroke: SmokeStroke;
}

export interface DitheringRenderer {
  isSoftwareRendered: boolean;
  resize: (cssWidth: number, cssHeight: number) => void;
  render: (frame: DitheringFrame) => void;
  dispose: () => void;
}

const ditheringUniformNames = [
  "u_time",
  "u_resolution",
  "u_pixelRatio",
  "u_cellSize",
  "u_colorBack",
  "u_colorFront",
  "u_flow",
] as const;

const flowTextureUnit = 0;

const softwareRendererPattern = /swiftshader|llvmpipe|softpipe|software|basic render/i;

function readRendererName(gl: WebGL2RenderingContext) {
  const debugRendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
  const rendererName = debugRendererInfo
    ? gl.getParameter(debugRendererInfo.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  return typeof rendererName === "string" ? rendererName : "";
}

export function createDitheringRenderer(
  canvas: HTMLCanvasElement,
  palette: DitheringPalette,
  preset: DitheringPreset,
): DitheringRenderer | null {
  const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false, antialias: false });
  if (!gl) return null;

  const program = linkProgram(gl, fullscreenVertexShaderSource, createSmokeDitheringFragmentShaderSource(preset));
  if (!program) return null;

  const fullscreenTriangle = createFullscreenTriangle(gl);
  const smokeFlowPass = createSmokeFlowPass(gl, fullscreenTriangle.vertexArray);
  if (!smokeFlowPass) return null;

  const uniforms = readUniformLocations(gl, program, ditheringUniformNames);
  let pixelRatio = 1;

  gl.useProgram(program);
  gl.uniform1f(uniforms.u_cellSize, preset.cellSizeInCssPixels);
  gl.uniform4fv(uniforms.u_colorFront, palette.ink);
  gl.uniform4fv(uniforms.u_colorBack, palette.backdrop);
  gl.uniform1i(uniforms.u_flow, flowTextureUnit);

  function resize(cssWidth: number, cssHeight: number) {
    pixelRatio = Math.min(window.devicePixelRatio || 1, ditheringTuning.maxDevicePixelRatio);
    canvas.width = Math.max(1, Math.round(cssWidth * pixelRatio));
    canvas.height = Math.max(1, Math.round(cssHeight * pixelRatio));
    smokeFlowPass!.resize(cssWidth, cssHeight);
  }

  function render(frame: DitheringFrame) {
    smokeFlowPass!.step(frame.stroke, frame.deltaSeconds, frame.time);

    gl!.useProgram(program);
    gl!.bindVertexArray(fullscreenTriangle.vertexArray);
    gl!.viewport(0, 0, canvas.width, canvas.height);
    smokeFlowPass!.bindFlowTexture(flowTextureUnit);
    gl!.uniform1f(uniforms.u_time, frame.time);
    gl!.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
    gl!.uniform1f(uniforms.u_pixelRatio, pixelRatio);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
  }

  function dispose() {
    smokeFlowPass!.dispose();
    fullscreenTriangle.dispose();
    gl!.deleteProgram(program);
  }

  return { isSoftwareRendered: softwareRendererPattern.test(readRendererName(gl)), resize, render, dispose };
}
