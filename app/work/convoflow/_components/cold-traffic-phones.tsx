import { convoFlowImages } from "../_lib/convoflow-images";
import { PhoneScreen } from "./phone-screen";

const phoneScreenSizes = "(min-width: 1024px) 360px, (min-width: 640px) 46vw, 80vw";

export function ColdTrafficPhones() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12">
      <PhoneScreen
        image={convoFlowImages.phoneFirstScreen}
        sizes={phoneScreenSizes}
        className="w-4/5 self-start sm:w-full lg:col-span-4 lg:col-start-3"
      />
      <PhoneScreen
        image={convoFlowImages.phoneLeadFlow}
        sizes={phoneScreenSizes}
        className="w-4/5 self-start justify-self-end sm:mt-16 sm:w-full sm:justify-self-auto lg:col-span-4 lg:mt-24"
      />
    </div>
  );
}
