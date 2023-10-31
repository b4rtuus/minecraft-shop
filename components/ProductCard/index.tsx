import Link from "next/link";
import PurchaseModal from "../PurchaseModal";

type ProductProps = {
  name: string;
  price: number;
  img?: string;
  maximumBuy: number;
  minimumBuy: number;
  description?: string;
  requireOnline: boolean;
  serverId: number;
};

export default function ProductCard({
  name,
  img,
  price,
  maximumBuy,
  minimumBuy,
  requireOnline,
  serverId,
  description,
}: ProductProps) {
  let Currency = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
  return (
    <div className="card bg-secondary p-4 rounded-md hover:bg-third transition-colors text-center flex flex-col justify-between">
      <img
        className="rounded-md max-h-[200px] aspect-auto mx-auto my-auto"
        src={img}
      />
      <div className="flex flex-col gap-3 mt-3">
        <label>{name}</label>
        <label className="text-green-400 font-bold">
          {Currency.format(price)}
        </label>
        <PurchaseModal
          name={name}
          img={img}
          maximumBuy={maximumBuy}
          minimumBuy={minimumBuy}
          description={description}
          requireOnline={requireOnline}
          serverId={serverId}
        />
      </div>
    </div>
  );
}
