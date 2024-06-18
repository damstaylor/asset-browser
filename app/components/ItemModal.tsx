// Specific item modal component that uses Modal.tsx component
"use client";

import Image from "next/image";
import Modal from "./Modal";
import Tag from "./Tag";
import ItemMetadata from "./ItemMetadata";
import BusinessQuestions from "./BusinessQuestions";
import { toTitleCase } from "../utils";

interface ItemModalProps {
  item: Asset;
  handleModalAction?: () => void;
  open: boolean;
  onClose: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  open = false,
  item,
  handleModalAction,
  onClose,
}) => {
  if (!item) {
    return null;
  }
  const formattedMetadata = item.metadata
    ? Object.entries(item.metadata).map(([key, value]) => ({
        key: key,
        label: toTitleCase(key),
        value: value,
      }))
    : null;
  return (
    <Modal open={open} onClose={onClose}>
      {!!item.image && (
        <div className="bg-slate-100 rounded m-2">
          <Image
            src={item.image}
            alt={item.name}
            width={32}
            height={32}
            className="w-8 m-3"
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">{item.name}</h2>
        <span className="text-xs p-0.5 rounded bg-slate-100">
          {item.assetType}
        </span>
      </div>
      <p className="text-xs mb-4">{item.description}</p>
      {item.details && <p>{item.details}</p>}
      <div className="flex justify-center gap-1 my-2">
        {item.tags && item.tags.map((tag, idx) => <Tag text={tag} key={idx} />)}
      </div>
      {!!item.metadata && <ItemMetadata data={formattedMetadata} />}
      <div className="h-1/5 w-full my-8 bg-slate-100"></div>
      {item.businessQuestions && (
        <BusinessQuestions questions={item.businessQuestions} />
      )}
      <button
        className={`flex place-content-center w-full mt-2 gap-2`}
        onClick={() => handleModalAction && handleModalAction()}
      >
        <Image
          src={item.isFavorite ? "/bookmark-filled.svg" : "/bookmark.svg"}
          alt="Favorite"
          width={16}
          height={16}
        />
        Favorite item
      </button>
    </Modal>
  );
};

export default ItemModal;
