import React from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface CardProps {
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  fullWidth?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  fullWidth = false,
}) => {
  return (
    <label
      className={`flex items-center gap-3 p-5 rounded-lg transition-all cursor-pointer ${
        fullWidth ? "w-full" : "w-auto"
      } ${
        isSelected
          ? "bg-gray-700 ring-4 ring-blue-500"
          : "bg-gray-800 hover:bg-gray-700"
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-col flex-1 gap-4">
        <h2 className="text-white text-xl font-semibold">{title}</h2>
        <p className="text-white text-sm">{description}</p>
        <div className="mt-4 flex gap-3 justify-end">
          <span
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <EditButton />
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <DeleteButton />
          </span>
        </div>
      </div>
    </label>
  );
};

export default Card;
