import React, { FunctionComponent, SVGProps } from "react";
import Modal from "./Modal";

interface TransferSuccessModalProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  message: string;
  onClose: () => void; // Callback to close the modal
  onViewWallet: () => void; // Callback to navigate to the cash wallet
}

const TransferSuccessModal: React.FC<TransferSuccessModalProps> = ({
  onClose,
  onViewWallet,
  Icon,
  message,
}) => {
  return (
    <Modal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[402px] p-6 shadow-lg text-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Checkmark Icon */}
          <Icon className="mx-auto" />

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Transfer Successful
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm mb-6">{message}</p>

          {/* Continue Button */}
          <button
            onClick={onClose}
            className="w-full py-3 text-white font-medium rounded-[24px] blue-gradient focus:outline-none mb-4 text-xs"
          >
            Continue
          </button>

          {/* View Wallet Link */}
          <button
            onClick={onViewWallet}
            className="text-blue-500 text-sm font-medium hover:underline focus:outline-none underline"
          >
            View Cash Wallet
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TransferSuccessModal;
