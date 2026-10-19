export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const STORY_BEAT_MILLISECONDS = 850;
export const RESTING_STEP_INDEX = 5;
export const LINE_DRAW_SECONDS = 0.85;

export type KpiKey = "bookings" | "revenue" | "onTime";

export type SyncStatus = { isSyncing: boolean; detail: string };

export type StoryStep = {
  activeNavIndex: number;
  areKpisCounted: boolean;
  bookingsTotal: number;
  drawnPointCount: number;
  isBookingToastShown: boolean;
  visibleAvatarCount: number;
  activeRoleIndex: number | null;
  syncStatus: SyncStatus;
};

export type RoleView = {
  name: string;
  hiddenKpis: readonly KpiKey[];
  hiddenNavIndexes: readonly number[];
  isChartDimmed: boolean;
};

export const ROLE_VIEWS: readonly RoleView[] = [
  { name: "Admin", hiddenKpis: [], hiddenNavIndexes: [], isChartDimmed: false },
  { name: "Staff", hiddenKpis: ["revenue"], hiddenNavIndexes: [3], isChartDimmed: false },
  { name: "Client", hiddenKpis: ["revenue", "onTime"], hiddenNavIndexes: [2, 3], isChartDimmed: true },
];

const syncingWith = (detail: string): SyncStatus => ({ isSyncing: true, detail });
const syncedAgo = (detail: string): SyncStatus => ({ isSyncing: false, detail });

const builtDashboard = { areKpisCounted: true, bookingsTotal: 312, drawnPointCount: 10, visibleAvatarCount: 3 };

export const STORY_STEPS: readonly StoryStep[] = [
  { activeNavIndex: 0, areKpisCounted: false, bookingsTotal: 311, drawnPointCount: 0, isBookingToastShown: false, visibleAvatarCount: 0, activeRoleIndex: null, syncStatus: syncingWith("") },
  { activeNavIndex: 0, areKpisCounted: true, bookingsTotal: 311, drawnPointCount: 4, isBookingToastShown: false, visibleAvatarCount: 1, activeRoleIndex: null, syncStatus: syncingWith("bookings") },
  { activeNavIndex: 0, areKpisCounted: true, bookingsTotal: 311, drawnPointCount: 7, isBookingToastShown: false, visibleAvatarCount: 2, activeRoleIndex: null, syncStatus: syncingWith("team") },
  { activeNavIndex: 0, areKpisCounted: true, bookingsTotal: 311, drawnPointCount: 9, isBookingToastShown: false, visibleAvatarCount: 3, activeRoleIndex: 0, syncStatus: syncedAgo("just now") },
  { ...builtDashboard, activeNavIndex: 1, isBookingToastShown: true, activeRoleIndex: 0, syncStatus: syncedAgo("1s ago") },
  { ...builtDashboard, activeNavIndex: 1, isBookingToastShown: true, activeRoleIndex: 0, syncStatus: syncedAgo("2s ago") },
  { ...builtDashboard, activeNavIndex: 1, isBookingToastShown: false, activeRoleIndex: 1, syncStatus: syncedAgo("3s ago") },
  { ...builtDashboard, activeNavIndex: 2, isBookingToastShown: false, activeRoleIndex: 1, syncStatus: syncedAgo("4s ago") },
  { ...builtDashboard, activeNavIndex: 1, isBookingToastShown: false, activeRoleIndex: 2, syncStatus: syncedAgo("5s ago") },
  { ...builtDashboard, activeNavIndex: 0, isBookingToastShown: false, activeRoleIndex: 2, syncStatus: syncedAgo("6s ago") },
  { ...builtDashboard, activeNavIndex: 3, isBookingToastShown: false, activeRoleIndex: 0, syncStatus: syncedAgo("7s ago") },
  { ...builtDashboard, activeNavIndex: 0, isBookingToastShown: false, activeRoleIndex: 0, syncStatus: syncingWith("refresh") },
];

export const DASHBOARD = { x: 96, y: 60, width: 360, height: 236 };

export const SIDEBAR = { dividerX: 140, centerX: 118, itemSize: 12, indicatorX: 98, itemYs: [76, 102, 128, 154] };

export type KpiTileLayout = { key: KpiKey; label: string; x: number; prefix: string; suffix: string; restingValue: number };

export const KPI_TILE_FRAME = { y: 76, width: 89, height: 44, padding: 9 };

export const KPI_TILES: readonly KpiTileLayout[] = [
  { key: "bookings", label: "BOOKINGS", x: 156, prefix: "", suffix: "", restingValue: 312 },
  { key: "revenue", label: "REVENUE", x: 253.5, prefix: "$", suffix: "k", restingValue: 48 },
  { key: "onTime", label: "ON TIME", x: 351, prefix: "", suffix: "%", restingValue: 97 },
];

export const CHART = { left: 156, right: 440, gridYs: [170, 207, 244] };

export const CHART_POINTS = [
  { x: 156, y: 268 },
  { x: 188, y: 258 },
  { x: 218, y: 262 },
  { x: 250, y: 244 },
  { x: 282, y: 248 },
  { x: 314, y: 228 },
  { x: 346, y: 216 },
  { x: 378, y: 222 },
  { x: 408, y: 198 },
  { x: 440, y: 176 },
] as const;

function cumulativeLengthFractions(points: readonly { x: number; y: number }[]) {
  const cumulativeLengths = points.reduce<number[]>((lengths, point, pointIndex) => {
    if (pointIndex === 0) return [0];
    const previousPoint = points[pointIndex - 1];
    return [...lengths, lengths[pointIndex - 1] + Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y)];
  }, []);
  const totalLength = cumulativeLengths[cumulativeLengths.length - 1];
  return cumulativeLengths.map((length) => Math.round((length / totalLength) * 10000) / 10000);
}

export const CHART_DRAWN_FRACTIONS = cumulativeLengthFractions(CHART_POINTS);

export const BOOKING_TOAST = { x: 156, y: 138, label: "NEW BOOKING", detail: "14:30" };

export const TEAM_CARD = { x: 474, y: 104, width: 118, height: 118, paddingX: 12 };

export const TEAM_AVATARS = [
  { x: 486, gradient: "linear-gradient(160deg, var(--foreground-soft), var(--border-strong))" },
  { x: 512, gradient: "linear-gradient(160deg, var(--muted-foreground), var(--border))" },
  { x: 538, gradient: "linear-gradient(160deg, var(--border-strong), var(--border))" },
];

export const TEAM_AVATAR_FRAME = { y: 135, size: 22 };

export const ROLE_ROWS = { x: 482, width: 102, firstY: 166, spacing: 16, height: 14 };

export const roleRowTop = (roleIndex: number) => ROLE_ROWS.firstY + roleIndex * ROLE_ROWS.spacing;
export const roleRowCenterY = (roleIndex: number) => roleRowTop(roleIndex) + ROLE_ROWS.height / 2;

export const ROLE_BRIDGE = { fromX: DASHBOARD.x + DASHBOARD.width, toX: TEAM_CARD.x };

export const STATUS_CHIP = { centerX: 276, y: 310, width: 164 };

export const SYNC_WIRE_POINTS = [
  { x: STATUS_CHIP.centerX + STATUS_CHIP.width / 2, y: 322.5 },
  { x: TEAM_CARD.x + TEAM_CARD.width / 2, y: 322.5 },
  { x: TEAM_CARD.x + TEAM_CARD.width / 2, y: TEAM_CARD.y + TEAM_CARD.height },
] as const;

export const SYNC_PULSE_PERIOD_MILLISECONDS = 1400;
