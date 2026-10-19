"use client";

import { SceneObject } from "../scene-parts";
import { SceneStage } from "../scene-stage";
import { useSceneBeat, useScenePlayback } from "../use-scene-playback";
import { BookingChart } from "./booking-chart";
import { BookingToast } from "./booking-toast";
import { DASHBOARD, RESTING_STEP_INDEX, ROLE_VIEWS, STORY_BEAT_MILLISECONDS, STORY_STEPS } from "./custom-web-applications-story";
import { DashboardSidebar } from "./dashboard-sidebar";
import { KpiTiles } from "./kpi-tiles";
import { ScenePlane } from "./scene-plane";
import { RoleBridgeWire } from "./role-bridge-wire";
import { SyncStatusChip } from "./sync-status-chip";
import { SyncWire } from "./sync-wire";
import { TeamCard } from "./team-card";

export type ServiceSceneProps = { label: string; isActive?: boolean };

const FIRST_BOOKING_STEP = STORY_STEPS.findIndex((step) => step.isBookingToastShown);

export function CustomWebApplicationsScene({ label, isActive = true }: ServiceSceneProps) {
  const { sceneReference, isPlaying } = useScenePlayback(isActive);
  const beat = useSceneBeat(isPlaying, STORY_BEAT_MILLISECONDS, STORY_STEPS.length, 0);
  const stepIndex = (beat + RESTING_STEP_INDEX) % STORY_STEPS.length;
  const step = STORY_STEPS[stepIndex];
  const roleView = ROLE_VIEWS[step.activeRoleIndex ?? 0];

  return (
    <div ref={sceneReference} className="size-full">
      <SceneStage label={label} figure="FIG 04 · APP">
        <ScenePlane>
          <SyncWire isPulsing={isPlaying && step.syncStatus.isSyncing} />
          <SceneObject x={DASHBOARD.x} y={DASHBOARD.y} width={DASHBOARD.width} height={DASHBOARD.height} />
          <DashboardSidebar activeNavIndex={step.activeNavIndex} hiddenNavIndexes={roleView.hiddenNavIndexes} />
          <KpiTiles
            areKpisCounted={step.areKpisCounted}
            bookingsTotal={step.bookingsTotal}
            isBookingLive={isPlaying && stepIndex === FIRST_BOOKING_STEP}
            roleView={roleView}
          />
          <BookingChart drawnPointCount={step.drawnPointCount} isDimmed={roleView.isChartDimmed} />
          <BookingToast isShown={step.isBookingToastShown} />
          <RoleBridgeWire activeRoleIndex={step.activeRoleIndex} />
          <TeamCard visibleAvatarCount={step.visibleAvatarCount} activeRoleIndex={step.activeRoleIndex} />
          <SyncStatusChip syncStatus={step.syncStatus} isPlaying={isPlaying} />
        </ScenePlane>
      </SceneStage>
    </div>
  );
}
