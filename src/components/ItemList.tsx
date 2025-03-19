import React from "react";
import { Item } from "../types/itemTypes";

interface Props {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

const ItemList: React.FC<Props> = ({ items, onDelete, onEdit }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="border p-2 mb-2 flex justify-between">
          <div>
            <h2 className="font-semibold">{item.title}</h2>
            <p>{item.body}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="bg-green-500 text-white px-3 py-1"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="bg-red-500 text-white px-3 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
