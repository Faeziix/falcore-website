import { BlueprintLabel, BlueprintText } from "../blueprint-label";
import {
  HEADLINE_FIRST_BASELINE,
  HEADLINE_LEFT,
  HEADLINE_SECOND_BASELINE,
  INTRO_LINES,
  LANDING_FRAME,
  NAV_BASELINE,
  NAV_LINKS,
} from "./landing-layout";

function LandingNavigation() {
  const buttonLeft = LANDING_FRAME.x + 1130;
  return (
    <g>
      <rect x={LANDING_FRAME.x + 40} y={LANDING_FRAME.y + 34} width={14} height={14} className="fill-primary" />
      <text x={LANDING_FRAME.x + 64} y={NAV_BASELINE} fontSize={17} letterSpacing={2} className="font-display fill-foreground">
        STUDIO
      </text>
      {NAV_LINKS.map((link) => (
        <BlueprintText key={link.label} x={LANDING_FRAME.x + link.x} y={NAV_BASELINE} size={15} tone="soft">
          {link.label}
        </BlueprintText>
      ))}
      <rect x={buttonLeft} y={LANDING_FRAME.y + 26} width={130} height={32} rx={16} fill="none" className="stroke-foreground" />
      <BlueprintText x={buttonLeft + 65} y={NAV_BASELINE} size={15} anchor="middle">
        Start a project
      </BlueprintText>
    </g>
  );
}

function LandingHeadline() {
  return (
    <g>
      <text
        x={HEADLINE_LEFT - 4}
        y={HEADLINE_FIRST_BASELINE}
        fontSize={196}
        fontWeight={600}
        letterSpacing={-6}
        className="font-display fill-foreground"
      >
        FORM
      </text>
      <text
        x={HEADLINE_LEFT}
        y={HEADLINE_SECOND_BASELINE}
        fontSize={214}
        fontStyle="italic"
        letterSpacing={-4}
        fill="none"
        strokeWidth={1.5}
        className="font-serif-display stroke-foreground"
      >
        follows feeling
      </text>
      {INTRO_LINES.map((line, index) => (
        <BlueprintText key={line} x={LANDING_FRAME.x + 760} y={LANDING_FRAME.y + 128 + index * 26} size={17} tone="soft">
          {line}
        </BlueprintText>
      ))}
    </g>
  );
}

function LandingFooterRow() {
  const baseline = LANDING_FRAME.y + 600;
  return (
    <g>
      <BlueprintLabel x={LANDING_FRAME.x + 380} y={baseline}>
        (01)  SCROLL
      </BlueprintLabel>
      <BlueprintLabel x={LANDING_FRAME.x + 740} y={baseline}>
        BRAND — WEB — MOTION
      </BlueprintLabel>
      <BlueprintLabel x={LANDING_FRAME.x + LANDING_FRAME.width - 40} y={baseline} anchor="end">
        2026
      </BlueprintLabel>
    </g>
  );
}

export function LandingPageFrame() {
  return (
    <rect
      x={LANDING_FRAME.x}
      y={LANDING_FRAME.y}
      width={LANDING_FRAME.width}
      height={LANDING_FRAME.height}
      className="fill-blueprint-paper stroke-muted-foreground"
    />
  );
}

export function LandingPageDesign() {
  return (
    <g>
      <LandingNavigation />
      <LandingHeadline />
      <LandingFooterRow />
    </g>
  );
}
