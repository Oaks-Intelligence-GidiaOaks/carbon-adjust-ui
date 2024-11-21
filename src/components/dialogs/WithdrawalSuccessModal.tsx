import React from "react";
import Modal from "./Modal";

interface ModalProps {
  onClose: () => void;
}

const WithdrawalSuccessModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <Modal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>

          {/* Success Icon */}
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m-6 8a9 9 0 100-18 9 9 0 000 18z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
            Withdrawal Successful
          </h3>

          {/* Message */}
          <p className="text-sm text-gray-600 text-center mb-6">
            You have successfully transferred your earnings to your designated
            bank account.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center space-y-4">
            <button className="w-full border border-blue-500 text-blue-500 font-medium rounded-lg px-4 py-2 hover:bg-blue-50">
              Download receipt
            </button>
            <button
              onClick={onClose}
              className="w-full bg-blue-500 text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawalSuccessModal;
