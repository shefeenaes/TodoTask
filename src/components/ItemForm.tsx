import React, { useState, useEffect } from "react";
import { Item } from "../types/itemTypes";

interface Props {
  onAdd: (title: string, body: string) => void;
  onEdit?: (id: number, title: string, body: string) => void;
  setEditingItem?: (item: Item | null) => void;
  initialTitle?: string;
  initialBody?: string;
  editingId?: number;
}

const ItemForm: React.FC<Props> = ({
  onAdd,
  onEdit,
  initialTitle = "",
  initialBody = "",
  editingId,
  setEditingItem,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  useEffect(() => {
    if (editingId) {
      setTitle(initialTitle);
      setBody(initialBody);
    }
  }, [editingId, initialTitle, initialBody]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    if (editingId && onEdit) {
      onEdit(editingId, title, body);
    } else {
      onAdd(title, body);
    }
    handleClear(); // Clear form after submit
  };

  const handleClear = () => {
    setTitle("");
    setBody("");
    if (setEditingItem) setEditingItem(null); // Clear editing item
  };

  return (
    <div className="relative w-full p-4 md:p-6 lg:p-8 rounded-xl bg-transparent">
      {/* Heading */}
      <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
        Task Form
      </h2>

      <div className="relative rounded-xl p-6 text-white border border-gray-700">
        <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="flex flex-col gap-2 w-full">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              className="w-full p-4 text-white bg-transparent border border-gray-700 rounded-lg resize-none outline-none ring-2 ring-blue-500/0 focus:ring-blue-500"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col gap-2 w-full">
            <textarea
              id="Description"
              name="Description"
              rows={5}
              required
              placeholder="Description"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-4 text-white bg-transparent border border-gray-700 rounded-lg resize-none outline-none ring-2 ring-blue-500/0 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center mt-4">
            {editingId ? (
              <>
                <div className="relative flex justify-center items-center">
                  <button
                    className="flex flex-col justify-center items-center p-4 bg-indigo-100 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-300/50 relative"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Update Task
                  </button>
                </div>
                <div className="relative flex justify-center items-center">
                  <button
                    className="flex flex-col justify-center items-center p-4 bg-indigo-100 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-300/50 relative"
                    type="button"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex justify-center items-center">
                  <button className="flex flex-col justify-center items-center p-4 bg-indigo-100 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-300/50 relative">
                    Add Task
                  </button>
                </div>
                <div className="relative flex justify-center items-center">
                  <button
                    className="flex flex-col justify-center items-center p-4 bg-indigo-100 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-300/50 relative"
                    type="reset"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
