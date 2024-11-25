import React from "react";
import Modal from "./Modal";
import { TickCircle } from "@/assets/icons";
import { MdClose } from "react-icons/md";

interface ModalProps {
  onClose: () => void;
}

const WithdrawalSuccessModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <Modal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-kumbh">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-bounceIn mx-5">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <MdClose size={20} />
          </button>

          {/* Success Icon */}
          <TickCircle className="mx-auto" />

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
            <button className="w-full border border-blue-500 text-blue-500 font-medium rounded-[24px] px-4 py-2 hover:bg-blue-50">
              Download receipt
            </button>

            <button
              onClick={onClose}
              className="w-full bg-blue-500 text-white font-medium rounded-[24px] px-4 py-2 hover:bg-blue-600"
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
