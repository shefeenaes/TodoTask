import { useEffect, useRef, useState } from "react";
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
import Toast from "./Toast";
import NavigationBar from "./NavBar";

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [addFlag, setAddFlag] = useState<boolean>(true); // Initially set to true
  const toastRef = useRef<{
    showToast: (
      type: "success" | "error",
      message: string,
      header: string
    ) => void;
  } | null>(null);

  const formRef = useRef<HTMLDivElement | null>(null);

  const triggerSuccessToast = (message: string, header: string) => {
    toastRef.current?.showToast("success", message, header);
  };

  const triggerErrorToast = (message: string, header: string) => {
    toastRef.current?.showToast("error", message, header);
  };

  const sortedItems = [...items].sort((a, b) => {
    return sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts();
        setItems(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        triggerErrorToast("Error fetching posts. Please try again.", "Error");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (title: string, body: string) => {
    try {
      if (!addFlag) {
        setErrorMessage(
          "You can't add more than 1 post, as the mock API server keeps creating posts with the same ID."
        );
        return;
      }

      const newItem: Item = await createPost(title, body);
      setItems([...items, newItem]);
      triggerSuccessToast("Task added successfully!", "Success");

      if (newItem.id === 101) {
        setAddFlag(false);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      triggerErrorToast("Failed to add task. Please try again.", "Error");
    }
  };

  const handleEdit = async (id: number, title: string, body: string) => {
    if (id === 101) {
      setErrorMessage(
        "You can't edit a brand new post! The Mock API server restricts it. Please try to edit other items."
      );
      return;
    }

    try {
      const updatedItem: Item = await updatePost(id, title, body);
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
      setEditingItem(null);
      triggerSuccessToast("Task updated successfully!", "Success");
    } catch (error) {
      console.error("Error editing task:", error);
      triggerErrorToast("Failed to update task. Please try again.", "Error");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setItems(items.filter((item) => item.id !== id));
      triggerSuccessToast("Task deleted successfully!", "Success");

      if (id === 101) {
        setAddFlag(true);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      triggerErrorToast("Failed to delete task. Please try again.", "Error");
    }
  };

  const handleClose = () => {
    setErrorMessage("");
  };

  const handleEditClick = (item: Item) => {
    setEditingItem(item);

    // Scroll to the form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Waves */}
      <div className="absolute left-0 w-full h-full wave-bg">
        <span className="wave-span wave-1"></span>
        <span className="wave-span wave-2"></span>
        <span className="wave-span wave-3"></span>
      </div>
      <div className="container px-4 py-8 transition-opacity relative z-50">
        {loading ? (
          <Loader />
        ) : (
          <>
            {errorMessage && (
              <ErrorCard message={errorMessage} handleClose={handleClose} />
            )}

            <NavigationBar />

            {/* Task Form */}
            <div ref={formRef}>
              <ItemForm
                onAdd={handleAdd}
                onEdit={handleEdit}
                initialTitle={editingItem?.title || ""}
                initialBody={editingItem?.body || ""}
                editingId={editingItem?.id}
                setEditingItem={setEditingItem}
              />
            </div>

            {/* Center the Sort button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={toggleSortOrder}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg"
              >
                Sort by Title (
                {sortOrder === "asc" ? "Ascending" : "Descending"})
              </button>
            </div>

            <ItemList
              items={sortedItems}
              onDelete={handleDelete}
              onEdit={handleEditClick} // Updated to use handleEditClick
            />
          </>
        )}
      </div>
      <Toast ref={toastRef} />
    </div>
  );
};

export default Home;
