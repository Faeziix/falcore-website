export const ditheringTuning = {
  maxDevicePixelRatio: 2,
  reducedMotionFrozenTime: 8,
  pointerFollowRate: 18,
  presenceFollowRate: 6,
  timeScaleFollowRate: 2,
  speedForFullSmokeInCssPixelsPerSecond: 900,
} as const;

export const warpPatternTuning = {
  patternScale: 0.6,
} as const;

export const wavePatternTuning = {
  shapeScale: 4,
} as const;

export const smokeFlowTuning = {
  cssPixelsPerFlowTexel: 6,
  splatRadius: 0.08,
  splatVelocityBlend: 0.6,
  densityInjection: 1,
  maxDensity: 1.1,
  advectionStrength: 0.6,
  curlFrequency: 1.8,
  curlStrength: 3.5,
  curlDriftSpeed: 0.15,
  densityDiffusion: 0.35,
  velocityDecayPerSecond: 1.4,
  densityDecayPerSecond: 0.9,
  waveDisplacementInCssPixels: 120,
  smokeInk: 1,
  smokeWispFrequencyPerCssPixel: 0.004,
} as const;

export type DitheringPattern = "warp" | "wave";
export type BayerMatrixSize = 4 | 8;

export interface DitheringPreset {
  pattern: DitheringPattern;
  bayerMatrixSize: BayerMatrixSize;
  cellSizeInCssPixels: number;
  idleTimeScale: number;
  activeTimeScale: number;
  colorTokens: { ink: string; backdrop: string };
}

export const ditheringPresets = {
  hero: {
    pattern: "warp",
    bayerMatrixSize: 4,
    cellSizeInCssPixels: 2,
    idleTimeScale: 0.2,
    activeTimeScale: 0.6,
    colorTokens: { ink: "--hero-dither-ink", backdrop: "--hero-dither-backdrop" },
  },
  waveCta: {
    pattern: "wave",
    bayerMatrixSize: 8,
    cellSizeInCssPixels: 3,
    idleTimeScale: 0.6,
    activeTimeScale: 1.1,
    colorTokens: { ink: "--wave-cta-dither-ink", backdrop: "--wave-cta-dither-backdrop" },
  },
} as const satisfies Record<string, DitheringPreset>;

export type DitheringPresetName = keyof typeof ditheringPresets;
