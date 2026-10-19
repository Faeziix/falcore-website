const SHARED_ART_DIRECTION =
  "Cinematic product-film still, 16:9, photographed not illustrated. Dark graphite studio, matte charcoal and gunmetal materials, soft overhead key light with gentle falloff, shallow depth of field, crisp engineered precision, premium and minimal. Accent colours appear only as small details: signal red (#e53935) and cool steel blue (#7fa6c8). Absolutely no text, letters, numbers, logos, people or hands. No neon glow, no lens flares, no haze.";

export type ServiceLoopPrompt = {
  slug: string;
  keyframePrompt: string;
  motionPrompt: string;
};

export const SERVICE_LOOP_PROMPTS: ServiceLoopPrompt[] = [
  {
    slug: "ai-enablement",
    keyframePrompt: `${SHARED_ART_DIRECTION} Macro view of a thick slab of smoked black glass resting on a graphite surface. Inside the glass, thousands of tiny luminous particles drift in from the left as a loose, tangled cloud and are combed into tidy parallel channels on the right, as if an intelligent system is sorting information. Most particles are steel blue, a few are signal red.`,
    motionPrompt:
      "Particles stream steadily from left to right through the glass and settle into the neat parallel channels, a continuous calm flow. Very slow camera push-in. The light and composition stay consistent so the clip loops seamlessly.",
  },
  {
    slug: "systems-automations",
    keyframePrompt: `${SHARED_ART_DIRECTION} A precision kinetic machine on a dark graphite plinth, seen at a three-quarter angle: brushed gunmetal rails, interlocking gears and small stations connected by a closed conveyor loop. Small anodized cubes ride the loop between stations, mostly steel blue with one signal red cube. Feels like a Swiss watch movement crossed with an automated production line.`,
    motionPrompt:
      "The cubes travel steadily around the conveyor loop, stopping briefly at each station; gears turn smoothly and continuously. Locked-off camera with a barely perceptible slow drift. Continuous mechanical motion that loops seamlessly.",
  },
  {
    slug: "web-design",
    keyframePrompt: `${SHARED_ART_DIRECTION} Overhead flat-lay on a dark charcoal desk. In the centre, a slim matte slab displays an abstract website layout built from clean grey rectangles, one signal red button-shaped block and two steel blue image blocks, arranged on a precise grid. Around it lie loose matte paper wireframe cards made of simple grey shapes and a machined metal ruler. All blocks are wordless abstract shapes.`,
    motionPrompt:
      "The layout blocks on the slab glide and snap into a refined new arrangement on the grid, then settle back; paper cards slide gently across the desk. Subtle slow shift of light. Overhead camera stays fixed so the clip loops seamlessly.",
  },
  {
    slug: "custom-web-applications",
    keyframePrompt: `${SHARED_ART_DIRECTION} Close three-quarter view of a matte black control console. A slim inset display shows an abstract dashboard made only of shapes: steel blue bar charts, a smooth line graph and one small signal red status indicator. On the console surface, machined aluminium dials and low-profile toggle switches. Wordless, numberless interface.`,
    motionPrompt:
      "Bars on the display rise and fall in a gentle rhythm, the line graph redraws smoothly, the red indicator pulses softly and one aluminium dial turns slowly. Very slow lateral camera drift. Continuous motion that loops seamlessly.",
  },
];
