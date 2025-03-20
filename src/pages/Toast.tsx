import { useState, forwardRef, useImperativeHandle } from "react";

// Forward ref for the Toast component

const Toast = forwardRef((_, ref) => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
    header: "",
  });

  // Exposing showToast function to the parent component via ref
  useImperativeHandle(ref, () => ({
    showToast(type: "success" | "error", message: string, header: string) {
      setToast({
        type,
        message,
        header,
        visible: true,
      });

      // Hide the toast after 3 seconds
      setTimeout(() => {
        setToast((prevToast) => ({
          ...prevToast,
          visible: false,
        }));
      }, 3000);
    },
  }));

  // If the toast is not visible, return null to avoid rendering
  if (!toast.visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 p-6 z-50 w-full text-white shadow-lg flex justify-between items-center ${
        toast.type === "success" ? "bg-[#71B34C]" : "bg-[#E25051]"
      }`}
    >
      <div className="flex flex-col max-w-[70%]">
        <h2 className="text-lg font-semibold">{toast.header}</h2>
        <p className="mt-2 text-sm">{toast.message}</p>
      </div>
      <span
        onClick={() =>
          setToast((prevToast) => ({ ...prevToast, visible: false }))
        }
        className="flex items-center gap-1  pb-0.5 text-sm text-white px-2 hover:opacity-80 focus:outline-none pr-4"
      >
        {toast.type === "error" ? (
          "Try again"
        ) : (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        )}
      </span>
    </div>
  );
});

export default Toast;
