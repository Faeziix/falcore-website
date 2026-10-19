import { smokeFlowTuning } from "./dithering-tuning";

const glslFloat = (value: number) => value.toFixed(4);

const simplexNoise = `
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float simplexNoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

export const fullscreenVertexShaderSource = `#version 300 es
layout(location = 0) in vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const smokeFlowFragmentShaderSource = `#version 300 es
precision highp float;

#define SPLAT_RADIUS ${glslFloat(smokeFlowTuning.splatRadius)}
#define SPLAT_VELOCITY_BLEND ${glslFloat(smokeFlowTuning.splatVelocityBlend)}
#define DENSITY_INJECTION ${glslFloat(smokeFlowTuning.densityInjection)}
#define MAX_DENSITY ${glslFloat(smokeFlowTuning.maxDensity)}
#define ADVECTION_STRENGTH ${glslFloat(smokeFlowTuning.advectionStrength)}
#define CURL_FREQUENCY ${glslFloat(smokeFlowTuning.curlFrequency)}
#define CURL_STRENGTH ${glslFloat(smokeFlowTuning.curlStrength)}
#define CURL_DRIFT_SPEED ${glslFloat(smokeFlowTuning.curlDriftSpeed)}
#define DENSITY_DIFFUSION ${glslFloat(smokeFlowTuning.densityDiffusion)}
#define VELOCITY_DECAY ${glslFloat(smokeFlowTuning.velocityDecayPerSecond)}
#define DENSITY_DECAY ${glslFloat(smokeFlowTuning.densityDecayPerSecond)}

uniform sampler2D u_previousFlow;
uniform vec2 u_flowTexelSize;
uniform float u_aspectRatio;
uniform vec2 u_strokeStart;
uniform vec2 u_strokeEnd;
uniform vec2 u_pointerVelocity;
uniform float u_smokeEmission;
uniform float u_deltaSeconds;
uniform float u_time;

out vec4 nextFlow;

${simplexNoise}

vec2 curlNoise(vec2 point) {
  const float epsilon = 0.01;
  float northSouth = simplexNoise(point + vec2(0.0, epsilon)) - simplexNoise(point - vec2(0.0, epsilon));
  float eastWest = simplexNoise(point + vec2(epsilon, 0.0)) - simplexNoise(point - vec2(epsilon, 0.0));
  return vec2(northSouth, -eastWest) / (2.0 * epsilon);
}

float distanceToStroke(vec2 point, vec2 strokeStart, vec2 strokeEnd) {
  vec2 stroke = strokeEnd - strokeStart;
  float progress = clamp(dot(point - strokeStart, stroke) / max(dot(stroke, stroke), 1e-6), 0.0, 1.0);
  return length(point - (strokeStart + stroke * progress));
}

void main() {
  vec2 uv = gl_FragCoord.xy * u_flowTexelSize;
  vec2 aspectScale = vec2(u_aspectRatio, 1.0);

  vec2 currentVelocity = texture(u_previousFlow, uv).xy;
  vec2 advectedUV = uv - currentVelocity * u_deltaSeconds * ADVECTION_STRENGTH / aspectScale;
  vec4 advected = texture(u_previousFlow, advectedUV);

  float neighbourDensity = 0.25 * (
    texture(u_previousFlow, advectedUV + vec2(u_flowTexelSize.x, 0.0)).z +
    texture(u_previousFlow, advectedUV - vec2(u_flowTexelSize.x, 0.0)).z +
    texture(u_previousFlow, advectedUV + vec2(0.0, u_flowTexelSize.y)).z +
    texture(u_previousFlow, advectedUV - vec2(0.0, u_flowTexelSize.y)).z
  );

  vec2 velocity = advected.xy;
  float density = mix(advected.z, neighbourDensity, DENSITY_DIFFUSION);

  float speed = length(velocity);
  vec2 curlSamplePoint = uv * aspectScale * CURL_FREQUENCY + vec2(0.0, u_time * CURL_DRIFT_SPEED);
  vec2 curledVelocity = velocity + curlNoise(curlSamplePoint) * speed * CURL_STRENGTH * u_deltaSeconds;
  velocity = speed > 1e-4 ? normalize(curledVelocity) * speed : velocity;

  float strokeDistance = distanceToStroke(uv * aspectScale, u_strokeStart * aspectScale, u_strokeEnd * aspectScale);
  float splat = exp(-(strokeDistance * strokeDistance) / (SPLAT_RADIUS * SPLAT_RADIUS)) * u_smokeEmission;
  velocity = mix(velocity, u_pointerVelocity * aspectScale, splat * SPLAT_VELOCITY_BLEND);
  density = min(MAX_DENSITY, density + splat * DENSITY_INJECTION);

  velocity *= exp(-VELOCITY_DECAY * u_deltaSeconds);
  density *= exp(-DENSITY_DECAY * u_deltaSeconds);

  nextFlow = vec4(velocity, density, 1.0);
}
`;

export const smokeDitheringFragmentShaderSource = `#version 300 es
precision highp float;

#define WAVE_DISPLACEMENT ${glslFloat(smokeFlowTuning.waveDisplacementInCssPixels)}
#define SMOKE_INK ${glslFloat(smokeFlowTuning.smokeInk)}
#define SMOKE_WISP_FREQUENCY ${glslFloat(smokeFlowTuning.smokeWispFrequencyPerCssPixel)}

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_cellSize;
uniform float u_patternScale;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform sampler2D u_flow;

out vec4 fragColor;

${simplexNoise}

const int bayer4x4[16] = int[16](
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5
);

float bayerThreshold(vec2 cellCoordinate) {
  ivec2 position = ivec2(mod(floor(cellCoordinate), 4.0));
  return float(bayer4x4[position.y * 4 + position.x]) / 16.0;
}

float warpField(vec2 shapeUV, float t) {
  shapeUV *= 0.003;
  for (float i = 1.0; i < 6.0; i++) {
    shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
    shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
  }
  float shape = 0.15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
  return smoothstep(0.02, 1.0, shape);
}

float smokeWisps(vec2 cssPoint, vec2 flowVelocity, float t) {
  vec2 wispPoint = cssPoint * SMOKE_WISP_FREQUENCY - flowVelocity * 0.25 + vec2(0.0, t * 0.6);
  float wisps = 0.7 * simplexNoise(wispPoint) + 0.3 * simplexNoise(wispPoint * 2.1 + 7.1);
  return smoothstep(-0.6, 0.9, wisps);
}

void main() {
  float t = 0.5 * u_time;
  vec2 centeredFragment = gl_FragCoord.xy - 0.5 * u_resolution;
  float cellSize = u_cellSize * u_pixelRatio;
  vec2 cellCoordinate = centeredFragment / cellSize;
  vec2 cellCenter = (floor(cellCoordinate) + 0.5) * cellSize;
  vec2 cellCenterInCss = cellCenter / u_pixelRatio;

  vec4 flow = texture(u_flow, (cellCenter + 0.5 * u_resolution) / u_resolution);
  vec2 waveOffset = flow.xy / (1.0 + length(flow.xy)) * WAVE_DISPLACEMENT;

  float pattern = warpField((cellCenterInCss - waveOffset) / u_patternScale, t);
  float smoke = flow.z * smokeWisps(cellCenterInCss, flow.xy, t);
  float shape = pattern + SMOKE_INK * smoke;
  float ink = step(0.5, shape + bayerThreshold(cellCoordinate) - 0.5);

  vec3 frontColor = u_colorFront.rgb * u_colorFront.a;
  vec3 backColor = u_colorBack.rgb * u_colorBack.a;
  float inkOpacity = u_colorFront.a * ink;
  vec3 color = frontColor * ink + backColor * (1.0 - inkOpacity);
  float opacity = inkOpacity + u_colorBack.a * (1.0 - inkOpacity);

  fragColor = vec4(color, opacity);
}
`;
