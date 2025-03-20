const EditButton = () => {
  return (
    <div className="relative flex justify-center items-center">
      <button className="flex flex-col justify-center items-center p-4 bg-indigo-100 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-300/50 relative">
        <svg
          className="w-6 stroke-[#6361D9]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>

        <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 w-20 bg-black/70 text-white text-center text-xs rounded px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Edit
        </span>
      </button>
    </div>
  );
};

export default EditButton;
