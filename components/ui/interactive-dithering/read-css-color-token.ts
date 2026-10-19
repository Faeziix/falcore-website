export type RgbaColor = [red: number, green: number, blue: number, alpha: number];

const opaqueBlack: RgbaColor = [0, 0, 0, 1];

function parseNormalizedCanvasColor(normalizedColor: string): RgbaColor {
  const hexMatch = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(normalizedColor);
  if (hexMatch) {
    return [
      Number.parseInt(hexMatch[1], 16) / 255,
      Number.parseInt(hexMatch[2], 16) / 255,
      Number.parseInt(hexMatch[3], 16) / 255,
      1,
    ];
  }

  const rgbaMatch = /^rgba?\(([^)]+)\)$/i.exec(normalizedColor);
  if (!rgbaMatch) return opaqueBlack;

  const [red, green, blue, alpha = "1"] = rgbaMatch[1].split(",").map((channel) => channel.trim());
  return [Number(red) / 255, Number(green) / 255, Number(blue) / 255, Number(alpha)];
}

export function readCssColorToken(tokenName: string, element: Element = document.documentElement): RgbaColor {
  const tokenValue = getComputedStyle(element).getPropertyValue(tokenName).trim();
  if (!tokenValue) return opaqueBlack;

  const colorNormalizer = document.createElement("canvas").getContext("2d");
  if (!colorNormalizer) return opaqueBlack;

  colorNormalizer.fillStyle = tokenValue;
  return parseNormalizedCanvasColor(colorNormalizer.fillStyle);
}
