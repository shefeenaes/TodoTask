// Home Component
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
import ErrorCard from "./ErrorCard";
import NavigationBar from "./NavBar";

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    createPost(title, body).then((newItem: Item) => {
      setItems([...items, newItem]);
      setErrorMessage("");
    });
  };

  const handleEdit = (id: number, title: string, body: string) => {
    if (id === 101) {
      setErrorMessage(
        "You can't edit a brand new item! It's still in its baby stage. Please try to edit other items."
      );
      return;
    }
    updatePost(id, title, body).then((updatedItem: Item) => {
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
      setEditingItem(null);
      setErrorMessage("");
    });
  };

  const handleDelete = (id: number) => {
    deletePost(id).then(() => setItems(items.filter((item) => item.id !== id)));
  };

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <div className="relative pt-24">
      <div className="container mx-auto px-4 py-8 transition-opacity relative z-50">
        {loading ? (
          <Loader />
        ) : (
          <>
            {errorMessage && (
              <ErrorCard message={errorMessage} handleClose={handleClose} />
            )}
            <NavigationBar />

            <ItemForm
              onAdd={handleAdd}
              onEdit={handleEdit}
              initialTitle={editingItem?.title || ""}
              initialBody={editingItem?.body || ""}
              editingId={editingItem?.id}
              setEditingItem={setEditingItem}
            />
            <button
              onClick={toggleSortOrder}
              className="bg-gray-500 text-white px-4 py-2 mb-4"
            >
              Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <ItemList
              items={sortedItems}
              onDelete={handleDelete}
              onEdit={(item) => setEditingItem(item)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
