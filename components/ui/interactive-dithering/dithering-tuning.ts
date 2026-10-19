export const ditheringTuning = {
  cellSizeInCssPixels: 2,
  patternScale: 0.6,
  maxDevicePixelRatio: 2,
  idleTimeScale: 0.2,
  activeTimeScale: 0.6,
  reducedMotionFrozenTime: 8,
  pointerFollowRate: 18,
  presenceFollowRate: 6,
  timeScaleFollowRate: 2,
  speedForFullSmokeInCssPixelsPerSecond: 900,
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

export const ditheringColorTokens = {
  ink: "--hero-dither-ink",
  backdrop: "--hero-dither-backdrop",
} as const;
