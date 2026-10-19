import { fullscreenVertexShaderSource, smokeFlowFragmentShaderSource } from "./dithering-shader-sources";
import { smokeFlowTuning } from "./dithering-tuning";
import { linkProgram, readUniformLocations } from "./webgl-program";

export interface SmokeStroke {
  strokeStartX: number;
  strokeStartY: number;
  strokeEndX: number;
  strokeEndY: number;
  pointerVelocityX: number;
  pointerVelocityY: number;
  smokeEmission: number;
}

export interface SmokeFlowPass {
  resize: (cssWidth: number, cssHeight: number) => void;
  step: (stroke: SmokeStroke, deltaSeconds: number, time: number) => void;
  bindFlowTexture: (textureUnit: number) => void;
  dispose: () => void;
}

interface FlowTarget {
  texture: WebGLTexture;
  framebuffer: WebGLFramebuffer;
}

const flowUniformNames = [
  "u_previousFlow",
  "u_flowTexelSize",
  "u_aspectRatio",
  "u_strokeStart",
  "u_strokeEnd",
  "u_pointerVelocity",
  "u_smokeEmission",
  "u_deltaSeconds",
  "u_time",
] as const;

function canRenderToHalfFloat(gl: WebGL2RenderingContext) {
  return Boolean(gl.getExtension("EXT_color_buffer_float") ?? gl.getExtension("EXT_color_buffer_half_float"));
}

function createFlowTarget(gl: WebGL2RenderingContext, width: number, height: number): FlowTarget {
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const framebuffer = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  return { texture, framebuffer };
}

function disposeFlowTarget(gl: WebGL2RenderingContext, target: FlowTarget) {
  gl.deleteFramebuffer(target.framebuffer);
  gl.deleteTexture(target.texture);
}

export function createSmokeFlowPass(gl: WebGL2RenderingContext, fullscreenVertexArray: WebGLVertexArrayObject | null): SmokeFlowPass | null {
  const isFlowSimulationSupported = canRenderToHalfFloat(gl);
  const program = linkProgram(gl, fullscreenVertexShaderSource, smokeFlowFragmentShaderSource);
  if (!program) return null;

  const uniforms = readUniformLocations(gl, program, flowUniformNames);
  let flowWidth = 1;
  let flowHeight = 1;
  let readTarget = createFlowTarget(gl, flowWidth, flowHeight);
  let writeTarget = createFlowTarget(gl, flowWidth, flowHeight);

  function resize(cssWidth: number, cssHeight: number) {
    flowWidth = Math.max(1, Math.round(cssWidth / smokeFlowTuning.cssPixelsPerFlowTexel));
    flowHeight = Math.max(1, Math.round(cssHeight / smokeFlowTuning.cssPixelsPerFlowTexel));
    disposeFlowTarget(gl, readTarget);
    disposeFlowTarget(gl, writeTarget);
    readTarget = createFlowTarget(gl, flowWidth, flowHeight);
    writeTarget = createFlowTarget(gl, flowWidth, flowHeight);
  }

  function step(stroke: SmokeStroke, deltaSeconds: number, time: number) {
    if (!isFlowSimulationSupported || deltaSeconds <= 0) return;

    gl.useProgram(program);
    gl.bindVertexArray(fullscreenVertexArray);
    gl.bindFramebuffer(gl.FRAMEBUFFER, writeTarget.framebuffer);
    gl.viewport(0, 0, flowWidth, flowHeight);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, readTarget.texture);

    gl.uniform1i(uniforms.u_previousFlow, 0);
    gl.uniform2f(uniforms.u_flowTexelSize, 1 / flowWidth, 1 / flowHeight);
    gl.uniform1f(uniforms.u_aspectRatio, flowWidth / flowHeight);
    gl.uniform2f(uniforms.u_strokeStart, stroke.strokeStartX, stroke.strokeStartY);
    gl.uniform2f(uniforms.u_strokeEnd, stroke.strokeEndX, stroke.strokeEndY);
    gl.uniform2f(uniforms.u_pointerVelocity, stroke.pointerVelocityX, stroke.pointerVelocityY);
    gl.uniform1f(uniforms.u_smokeEmission, stroke.smokeEmission);
    gl.uniform1f(uniforms.u_deltaSeconds, deltaSeconds);
    gl.uniform1f(uniforms.u_time, time);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    [readTarget, writeTarget] = [writeTarget, readTarget];
  }

  function bindFlowTexture(textureUnit: number) {
    gl.activeTexture(gl.TEXTURE0 + textureUnit);
    gl.bindTexture(gl.TEXTURE_2D, readTarget.texture);
  }

  function dispose() {
    disposeFlowTarget(gl, readTarget);
    disposeFlowTarget(gl, writeTarget);
    gl.deleteProgram(program);
  }

  return { resize, step, bindFlowTexture, dispose };
}
