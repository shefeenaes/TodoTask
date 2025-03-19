import { useEffect, useState } from "react";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";
import {
  fetchPosts,
  createPost,
  deletePost,
  updatePost,
} from "../api/postServices";
import { Item } from "../types/itemTypes";

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === "asc") return a.title.localeCompare(b.title);
    return b.title.localeCompare(a.title);
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    fetchPosts().then(setItems);
  }, []);

  const handleAdd = (title: string, body: string) => {
    createPost(title, body).then((newItem: Item) =>
      setItems([...items, newItem])
    );
  };

  const handleEdit = (id: number, title: string, body: string) => {
    updatePost(id, title, body).then((updatedItem: Item) => {
      console.log("before");
      console.dir(items);
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
      console.log("after");
      console.dir(items);
      setEditingItem(null);
    });
  };

  const handleDelete = (id: number) => {
    deletePost(id).then(() => setItems(items.filter((item) => item.id !== id)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Item List</h1>
      <button
        onClick={toggleSortOrder}
        className="bg-gray-500 text-white px-4 py-2 mb-4"
      >
        Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      <ItemForm
        onAdd={handleAdd}
        onEdit={handleEdit}
        initialTitle={editingItem?.title || ""}
        initialBody={editingItem?.body || ""}
        editingId={editingItem?.id}
      />
      <ItemList
        items={sortedItems}
        onDelete={handleDelete}
        onEdit={(item) => setEditingItem(item)}
      />
    </div>
  );
};

export default App;
