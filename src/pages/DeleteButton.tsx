const DeleteButton = () => {
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
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1={10} y1={11} x2={10} y2={17} />
          <line x1={14} y1={11} x2={14} y2={17} />
        </svg>
        {/* Tooltip */}
        <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 w-20 bg-black/70 text-white text-center text-xs rounded px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Remove
        </span>
      </button>
    </div>
  );
};

export default DeleteButton;
