import { ChoosePricingCard } from "./ChoosePricingCard";

export function ChoosePricing() {
  return (
    <div className=" w-full justify-center">
      <div className="md:flex border-gray-300 border-2 rounded-lg justify-center p-8">
        <ChoosePricingCard
          sessions={8}
          perSessionPrice={32.5}
          totalPrice={260}
        />
        <div className="divider md:divider-horizontal"></div>
        <ChoosePricingCard
          sessions={12}
          perSessionPrice={26}
          totalPrice={312}
        />
        <div className="divider md:divider-horizontal"></div>
        <ChoosePricingCard
          sessions={24}
          perSessionPrice={22}
          totalPrice={528}
        />
      </div>
    </div>
  );
}
