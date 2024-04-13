type Props = {
  onClose: () => void;
  show: boolean;
  titleText: string;
  confirmText: string;
  children: JSX.Element;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

const Modal = (props: Props) => {
  const { onClose, show, titleText, confirmText, children, onSubmit } = props;
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full
        ${show ? "block" : "hidden"}
      `}
    >
      <div className="relative p-4 w-full max-w-[500px] max-h-full m-auto flex items-center justify-center">
        <div className="relative bg-white rounded-lg shadow">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-slate-300">
            <h3 className="text-xl font-semibold text-gray-900 mr-3">
              {titleText}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
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
          {/* Modal body */}
          <form onSubmit={onSubmit}>
            <div className="p-4 md:p-5 space-y-4">{children}</div>
            {/* Modal footer  */}
            <div className="flex items-center justify-end p-4 md:p-5 border-t rounded-b border-slate-300">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {confirmText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
