// Item metadata component: displays in detail
"use client";

interface ItemMetadataProps {
  data: {
    key: string;
    label: string;
    value: string;
  }[];
}

const ItemMetadata: React.FC<ItemMetadataProps> = ({ data = [] }) => {
  return (
    <div className="flex justify-between w-full m-4 divide-x-2">
      {data.map((it) => (
        <div key={it.key} className="flex flex-col items-center w-full">
          <strong>{it.value}</strong>
          <span className="capitalize">{it.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ItemMetadata;
