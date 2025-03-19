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
import Loader from "./Loader";

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState<boolean>(true);

  const sortedItems = [...items].sort((a, b) => {
    if (sortOrder === "asc") return a.title.localeCompare(b.title);
    return b.title.localeCompare(a.title);
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPosts().then((data) => {
          setItems(data);
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    fetchData();
  }, []);

  const handleAdd = (title: string, body: string) => {
    createPost(title, body).then((newItem: Item) =>
      setItems([...items, newItem])
    );
  };

  const handleEdit = (id: number, title: string, body: string) => {
    updatePost(id, title, body).then((updatedItem: Item) => {
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
      setEditingItem(null);
    });
  };

  const handleDelete = (id: number) => {
    deletePost(id).then(() => setItems(items.filter((item) => item.id !== id)));
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Home;
