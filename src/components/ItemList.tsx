import React, { useState } from "react";
import { Item } from "../types/itemTypes";
import Card from "../pages/Card";

interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onEdit }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-lg w-full mx-auto">
      <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
        Task List
      </h2>

      <div className="flex flex-col gap-4 w-full">
        {items.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.body}
            isSelected={selectedId === item.id}
            onSelect={() => setSelectedId(item.id)}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}
            fullWidth={true} // Pass fullWidth prop to adjust styling in Card
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
