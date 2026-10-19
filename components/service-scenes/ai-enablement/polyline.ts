import type { ScenePoint } from "../scene-units";

function segmentLength(start: ScenePoint, end: ScenePoint) {
  return Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
}

export function pointAlongPolyline(points: ScenePoint[], progress: number): ScenePoint {
  const lengths = points.slice(1).map((point, index) => segmentLength(points[index], point));
  const totalLength = lengths.reduce((sum, length) => sum + length, 0);
  let remainingLength = Math.min(Math.max(progress, 0), 1) * totalLength;
  for (let index = 0; index < lengths.length; index++) {
    const isLastSegment = index === lengths.length - 1;
    if (remainingLength <= lengths[index] || isLastSegment) {
      const ratio = lengths[index] === 0 ? 0 : Math.min(remainingLength / lengths[index], 1);
      const start = points[index];
      const end = points[index + 1];
      return { x: start.x + (end.x - start.x) * ratio, y: start.y + (end.y - start.y) * ratio };
    }
    remainingLength -= lengths[index];
  }
  return points[points.length - 1];
}

export function polylinePath(points: ScenePoint[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
}
