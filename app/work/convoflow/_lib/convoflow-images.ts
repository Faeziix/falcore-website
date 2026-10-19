import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

export const convoFlowImages = {
  heroDesktop: {
    src: "/work/convoflow/hero-flow-desktop.webp",
    alt: "ConvoFlow homepage on a desktop: the headline “Turn leads into booked calls without lifting a finger” with a pink underline, a booking button, and a diagram of Google, TikTok and Meta ads flowing into the AI engine and out as hot, warm and long-term leads",
    width: 2880,
    height: 1800,
  },
  phoneFirstScreen: {
    src: "/work/convoflow/phone-first-screen.webp",
    alt: "The first screen on a phone: the headline, one line on what the service does, the booking button and a “Prefer WhatsApp?” link",
    width: 828,
    height: 1200,
  },
  phoneLeadFlow: {
    src: "/work/convoflow/phone-lead-flow-still.webp",
    alt: "The next screen on a phone: the lead-flow diagram turned upright, with three ad sources above the AI engine and hot, warm and long-term leads below",
    width: 828,
    height: 880,
  },
  demoBookingDesktop: {
    src: "/work/convoflow/demo-booking-card-desktop.webp",
    alt: "The end of the demo chat on a desktop: the AI asks for a name and phone number, above a card with a name field, a phone field with a +971 country code and a “Call Me Now” button",
    width: 2280,
    height: 1030,
  },
  demoBookingMobile: {
    src: "/work/convoflow/demo-booking-card-mobile.webp",
    alt: "The same demo step on a phone, with the name and phone fields and the “Call Me Now” button",
    width: 828,
    height: 920,
  },
  calculatorProjection: {
    src: "/work/convoflow/calculator-example-projection.webp",
    alt: "The revenue calculator: four sliders for leads per month, conversion rate, customer value and response time, beside a projection card showing example figures in dirhams",
    width: 2880,
    height: 1500,
  },
  processEditableCopy: {
    src: "/work/convoflow/process-step-one.webp",
    alt: "The “Installed in 7 days” process section: a heading over a dot grid and the first step on a vertical timeline, all of it text the owner can edit",
    width: 2880,
    height: 1280,
  },
} satisfies Record<string, CaseStudyImage>;

export const convoFlowMobileImages = {
  heroCrop: {
    src: "/work/convoflow/hero-flow-phone-crop.webp",
    alt: "ConvoFlow homepage: the headline “Turn leads into booked calls without lifting a finger” above a diagram of Google, TikTok and Meta ads flowing into the AI engine and out as hot, warm and long-term leads",
    width: 1920,
    height: 1560,
  },
  calculatorProjection: {
    src: "/work/convoflow/calculator-example-projection-mobile.webp",
    alt: "The calculator's projection on a phone: an example monthly and yearly figure in dirhams, leads recovered, time saved and a revenue comparison",
    width: 828,
    height: 1500,
  },
  processEditableCopy: {
    src: "/work/convoflow/process-step-one-mobile.webp",
    alt: "The “Installed in 7 days” process section on a phone, with its heading, intro and the first step card",
    width: 828,
    height: 1372,
  },
} satisfies Record<string, CaseStudyImage>;
