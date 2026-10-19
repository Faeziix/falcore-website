export const LAYER_PLANE = { width: 1000, height: 620 };
export const LAYER_GAP = 150;

export const DASHBOARD_SIDEBAR_WIDTH = 190;
export const DASHBOARD_CONTENT_LEFT = DASHBOARD_SIDEBAR_WIDTH + 24;

export const DASHBOARD_KPIS = [
  { label: "REVENUE", value: "$48.2k" },
  { label: "ORDERS", value: "312" },
  { label: "ON TIME", value: "97%" },
  { label: "AVG. TURNAROUND", value: "4.1h" },
];

export const KPI_SPARKLINE_RISES = [4, 10, 7, 14, 11, 18, 22];

export const THROUGHPUT_CHART = { x: DASHBOARD_CONTENT_LEFT, y: 200, width: 520, height: 250 };
export const THROUGHPUT_VALUES = [0.32, 0.4, 0.36, 0.5, 0.46, 0.58, 0.54, 0.66, 0.62, 0.74, 0.7, 0.84];

export const CHANNEL_SHARES = [
  { share: 0.46, tone: "line" as const },
  { share: 0.3, tone: "soft" as const },
  { share: 0.24, tone: "signal" as const },
];

export const LOGIC_RULES = [
  { x: 80, y: 140, label: "NEW ORDER" },
  { x: 340, y: 90, label: "CHECK STOCK" },
  { x: 340, y: 290, label: "APPROVE" },
  { x: 620, y: 190, label: "ASSIGN" },
  { x: 620, y: 420, label: "NOTIFY" },
  { x: 80, y: 420, label: "SCHEDULE" },
];

export const LOGIC_LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [5, 2],
];

export function throughputPoints() {
  const { x, y, width, height } = THROUGHPUT_CHART;
  const step = (width - 40) / (THROUGHPUT_VALUES.length - 1);
  return THROUGHPUT_VALUES.map((value, index) => ({ x: x + 20 + index * step, y: y + height - 30 - value * (height - 70) }));
}
