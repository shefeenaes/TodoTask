import React, { useState, useEffect } from "react";

interface Props {
  onAdd: (title: string, body: string) => void;
  onEdit?: (id: number, title: string, body: string) => void;
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
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-2"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {editingId ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

export default ItemForm;
