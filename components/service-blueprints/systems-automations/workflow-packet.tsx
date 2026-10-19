"use client";

import { useRef } from "react";
import { useAnimationFrame } from "motion/react";
import { LIVE_WORKFLOW_EDGE, workflowEdgeGeometry } from "./workflow-data";

const LIVE_GEOMETRY = workflowEdgeGeometry(LIVE_WORKFLOW_EDGE);
const PACKET_SIZE = 14;
const HALO_SIZE = 26;

export function WorkflowPacket({ isPlaying, travelDurationMilliseconds }: { isPlaying: boolean; travelDurationMilliseconds: number }) {
  const routeReference = useRef<SVGPathElement>(null);
  const packetReference = useRef<SVGGElement>(null);

  useAnimationFrame((elapsedMilliseconds) => {
    const route = routeReference.current;
    const packet = packetReference.current;
    if (!isPlaying || !route || !packet) return;
    const progress = (elapsedMilliseconds % travelDurationMilliseconds) / travelDurationMilliseconds;
    const point = route.getPointAtLength(progress * route.getTotalLength());
    packet.setAttribute("transform", `translate(${point.x} ${point.y})`);
  });

  return (
    <g>
      <path ref={routeReference} d={LIVE_GEOMETRY.pathData} fill="none" stroke="none" />
      <g ref={packetReference} transform={`translate(${LIVE_GEOMETRY.middle.x} ${LIVE_GEOMETRY.middle.y})`}>
        <rect x={-PACKET_SIZE / 2} y={-PACKET_SIZE / 2} width={PACKET_SIZE} height={PACKET_SIZE} className="fill-primary" />
        <rect x={-HALO_SIZE / 2} y={-HALO_SIZE / 2} width={HALO_SIZE} height={HALO_SIZE} fill="none" strokeOpacity={0.5} className="stroke-primary" />
      </g>
    </g>
  );
}
