// Generic modal component:has an optional title and content passed through 'children' technical prop
"use client";

import { ReactNode } from "react";

interface ModalProps {
  title?: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  open = false,
  onClose,
}) => {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-6/12 max-h-[90vh]">
        <div className="relative flex justify-center mb-4">
          <header>
            {title && <h2 className="text-2xl font-bold">{title}</h2>}
          </header>
          <button
            type="button"
            onClick={onClose}
            className="absolute -top-8 -right-8 text-gray-500 text-lg bg-white hover:text-gray-700 "
          >
            x
          </button>
        </div>
        <div className="flex flex-col items-center mb-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
