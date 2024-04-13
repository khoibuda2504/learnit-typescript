import { useEffect } from "react";
import { usePostContext } from "../../contexts/PostContext";

const Toast = () => {
  const {
    showToast: { show, message, type },
    setShowToast,
  } = usePostContext();
  const clearToast = () => {
    setShowToast({ show: false, message: "", type: null });
  };
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 2000);
    return () => clearTimeout(timer);
  }, [show]);
  if (!show) return null;
  return (
    <div
      className={`absolute right-0 flex items-center max-w-[200px] p-4 text-gray-500  rounded-lg shadow 
        ${type === "danger" ? "bg-red-200" : " bg-green-200"}`}
    >
      <div className="text-sm mr-2">{message}</div>
      <button
        type="button"
        onClick={clearToast}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
      >
        <svg
          className="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
