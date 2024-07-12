// AIModal.tsx
import React from "react";

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onValueChange: (val: boolean) => void;
}

const AIModal: React.FC<ModalProps> = ({
  showModal,
  onClose,
  onValueChange,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-950/30 backdrop-blur-sm">
      {/* <div className="fixed inset-0 bg-black opacity-50"></div> */}
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-6 lg:mx-8 pointer-events-auto">
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold mb-4">AI Energy Package</h2>
          <p className="mb-4">
            By ticking the field called <strong>AI Energy package</strong>, you
            acknowledge that it will require the customer to upload their energy
            bill when applying for this package.
          </p>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 cursor-pointer"
              onClick={() => {
                onValueChange(false);
                onClose();
              }}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
              onClick={() => {
                onValueChange(true);
                onClose();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModal;
