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
      className={`flex flex-col sm:flex-row items-center gap-3 p-4 sm:p-5 rounded-lg shadow-lg transition-all cursor-pointer 
        ${fullWidth ? "w-full" : "max-w-full"} 
        ${
          isSelected
            ? "bg-gray-700 ring-4 ring-blue-500"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
      onClick={onSelect}
    >
      <div className="flex flex-col flex-1 gap-3 w-full">
        <h2 className="text-white text-base sm:text-lg font-semibold line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h2>

        <p className="text-white text-sm sm:text-base overflow-hidden text-ellipsis line-clamp-2 sm:line-clamp-4">
          {description}
        </p>

        <div className="mt-4 flex flex-row gap-3 justify-center sm:justify-end w-full">
          <span
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="hover:scale-105 transition-transform"
          >
            <EditButton />
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="hover:scale-105 transition-transform"
          >
            <DeleteButton />
          </span>
        </div>
      </div>
    </label>
  );
};

export default Card;
