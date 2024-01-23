import { ConfirmBuyModal } from "./ConfirmBuyModal";

export function ChoosePricingCard({
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
      <ConfirmBuyModal sessions={sessions} />
    </div>
  );
}
