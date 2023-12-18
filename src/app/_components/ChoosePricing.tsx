function PricingCard({
  sessions,
  perSessionPrice,
  totalPrice,
}: {
  sessions: number;
  totalPrice: number;
  perSessionPrice: number;
}) {
  return (
    <div className="text-center px-8">
      <p className="text-lg font-semibold">{sessions} sessions</p>
      <p className="text-4xl font-semibold mt-4">
        ${perSessionPrice.toFixed(2)}
      </p>
      <p className="text-xs text-gray-500">per session</p>
      <p className="text-sm  text-gray-500 mt-6">${totalPrice.toFixed(2)}</p>
      <button className="btn btn-primary w-full mt-12 max-w-xs">
        Choose Plan
      </button>
    </div>
  );
}

export default function ChoosePricing() {
  return (
    <div className=" w-full justify-center">
      <div className="md:flex border-gray-300 border-2 rounded-lg justify-center p-8">
        <PricingCard sessions={8} perSessionPrice={32.5} totalPrice={260} />
        <div className="divider md:divider-horizontal"></div>
        <PricingCard sessions={12} perSessionPrice={26} totalPrice={312} />
        <div className="divider md:divider-horizontal"></div>
        <PricingCard sessions={24} perSessionPrice={22} totalPrice={528} />
      </div>
    </div>
  );
}
