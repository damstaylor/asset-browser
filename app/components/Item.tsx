"use client";

interface ItemProps {
  handleItemClick: () => void;
  item: Asset;
}

import Image from "next/image";
import pieChart from "../../public/pie-chart.svg";

const Item: React.FC<ItemProps> = ({ handleItemClick, item }) => {
  const image = item.image ?? pieChart;
  return (
    <div
      className={`flex items-center relative p-4 hover:bg-slate-100 hover:cursor-pointer rounded ${item.category === "Featured" && "bg-white border border-gray-200"}`}
      onClick={handleItemClick}
    >
      {item.isFavorite && (
        <Image
          src="/bookmark-filled.svg"
          alt="Favorite"
          width={16}
          height={16}
          className="absolute top-2 right-2"
        />
      )}
      <div className="flex justify-center w-32 aspect-square bg-slate-200 rounded">
        <Image
          src={image}
          alt={item.name}
          width={64}
          height={64}
          className="p-4"
        />
      </div>
      <div className="pl-4">
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        {!!item.lastUpdated && <span>{item.lastUpdated}</span>}
      </div>
    </div>
  );
};
export default Item;
