export type SystemNodeId =
  | "website"
  | "phone"
  | "invoices"
  | "crm"
  | "assistant"
  | "whatsapp"
  | "calendar";

export type SystemNode = {
  id: SystemNodeId;
  label: string;
  x: number;
  y: number;
};

export type ScenarioStep = {
  nodeId: SystemNodeId;
  time: string;
  message: string;
};

export type OperationScenario = {
  id: string;
  label: string;
  steps: ScenarioStep[];
};

export const SYSTEM_CANVAS = { width: 640, height: 380 };

export const SYSTEM_NODES: SystemNode[] = [
  { id: "website", label: "Website", x: 84, y: 70 },
  { id: "phone", label: "Phone line", x: 84, y: 190 },
  { id: "invoices", label: "Invoices", x: 84, y: 310 },
  { id: "crm", label: "CRM", x: 320, y: 110 },
  { id: "assistant", label: "AI assistant", x: 320, y: 270 },
  { id: "whatsapp", label: "WhatsApp", x: 556, y: 190 },
  { id: "calendar", label: "Calendar", x: 556, y: 70 },
];

export const SYSTEM_CONNECTIONS: [SystemNodeId, SystemNodeId][] = [
  ["website", "crm"],
  ["invoices", "crm"],
  ["phone", "assistant"],
  ["crm", "assistant"],
  ["crm", "whatsapp"],
  ["assistant", "whatsapp"],
  ["whatsapp", "calendar"],
];

export const OPERATION_SCENARIOS: OperationScenario[] = [
  {
    id: "new-lead",
    label: "A new lead",
    steps: [
      {
        nodeId: "website",
        time: "09:41:07",
        message: "New enquiry from the website form",
      },
      {
        nodeId: "crm",
        time: "09:41:08",
        message: "Saved to the CRM and tagged “kitchen remodel”",
      },
      {
        nodeId: "assistant",
        time: "09:41:21",
        message: "AI assistant drafts a reply using your price list",
      },
      {
        nodeId: "whatsapp",
        time: "09:41:45",
        message: "WhatsApp reply sent, 38 seconds after the enquiry",
      },
      {
        nodeId: "calendar",
        time: "09:47:12",
        message: "Site visit booked for Thursday at 10:00",
      },
    ],
  },
  {
    id: "after-hours-call",
    label: "An after-hours call",
    steps: [
      {
        nodeId: "phone",
        time: "21:14:02",
        message: "Call comes in after you have closed",
      },
      {
        nodeId: "assistant",
        time: "21:14:09",
        message: "AI assistant answers and takes down the details",
      },
      {
        nodeId: "crm",
        time: "21:16:31",
        message: "Call summary and a follow-up task added to the CRM",
      },
      {
        nodeId: "whatsapp",
        time: "21:16:33",
        message: "Caller gets a WhatsApp with your booking link",
      },
      {
        nodeId: "calendar",
        time: "21:20:47",
        message: "They book the first slot tomorrow, 8:30 am",
      },
    ],
  },
  {
    id: "unpaid-invoice",
    label: "An unpaid invoice",
    steps: [
      {
        nodeId: "invoices",
        time: "10:00:00",
        message: "Invoice #1042 is now 7 days overdue",
      },
      {
        nodeId: "crm",
        time: "10:00:01",
        message: "CRM checks the account: good history, first late payment",
      },
      {
        nodeId: "assistant",
        time: "10:00:04",
        message: "AI assistant writes a friendly reminder in your tone",
      },
      {
        nodeId: "whatsapp",
        time: "10:00:05",
        message: "Reminder sent on WhatsApp with a payment link",
      },
      {
        nodeId: "crm",
        time: "14:32:18",
        message: "Paid. The CRM and your books update themselves",
      },
    ],
  },
];

export function findSystemNode(nodeId: SystemNodeId) {
  return SYSTEM_NODES.find((node) => node.id === nodeId)!;
}

export function buildConnectionPath(fromId: SystemNodeId, toId: SystemNodeId) {
  const from = findSystemNode(fromId);
  const to = findSystemNode(toId);
  const horizontalMidpoint = (from.x + to.x) / 2;

  if (from.x === to.x) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }

  return `M ${from.x} ${from.y} C ${horizontalMidpoint} ${from.y}, ${horizontalMidpoint} ${to.y}, ${to.x} ${to.y}`;
}
