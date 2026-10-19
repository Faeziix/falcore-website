import { convoFlowImages } from "../_lib/convoflow-images";
import { PhoneScreen } from "./phone-screen";

const phoneScreenSizes = "(min-width: 1024px) 360px, 46vw";

export function ColdTrafficPhones() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-12 lg:gap-8">
      <PhoneScreen
        image={convoFlowImages.phoneFirstScreen}
        sizes={phoneScreenSizes}
        className="self-start lg:col-span-4 lg:col-start-3"
      />
      <PhoneScreen
        image={convoFlowImages.phoneLeadFlow}
        sizes={phoneScreenSizes}
        className="self-start lg:col-span-4 lg:mt-24"
      />
    </div>
  );
}
