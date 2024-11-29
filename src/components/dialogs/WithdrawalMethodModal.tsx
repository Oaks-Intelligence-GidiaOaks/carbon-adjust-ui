import React, { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import { BankIcon, CreditCard } from "@/assets/icons";
import { MdClose } from "react-icons/md";

interface WithdrawalMethodModalProps {
  selectMethod: Dispatch<SetStateAction<"bank" | "card" | null>>;
  selectedMethod: string | null;
  onClose: () => void; // Callback to close the modal
  onConfirm: (method: string) => void; // Callback for confirming transfer
}

const WithdrawalMethodModal: React.FC<WithdrawalMethodModalProps> = ({
  onClose,
  onConfirm,
  selectMethod,
  selectedMethod,
}) => {
  return (
    <Modal>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 font-kumbh">
        <div className="bg-white rounded-lg shadow-lg w-full mx-5 max-w-md p-8 animate-bounceIn">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Withdrawal method</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <MdClose size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <p className="text-gray-600 mb-4">
            Select your preferred withdrawal method below.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* To Bank */}
            <button
              onClick={() => selectMethod("bank")}
              className={`flex flex-col items-center justify-center border rounded-lg p-4 ${
                selectedMethod === "bank"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <BankIcon className="w-16 h-auto" />

              <span
                className={`text-sm font-medium ${
                  selectedMethod === "bank" ? "text-blue-500" : "text-gray-700"
                }`}
              >
                To Bank
              </span>
            </button>

            {/* To Card */}
            <button
              onClick={() => selectMethod("card")}
              className={`flex flex-col items-center justify-center border rounded-lg p-4 ${
                selectedMethod === "card"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <CreditCard className="w-16 h-auto" />

              <span
                className={`text-sm font-medium ${
                  selectedMethod === "card" ? "text-blue-500" : "text-gray-700"
                }`}
              >
                To Card
              </span>
            </button>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-center gap-5 items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 flex-1  text-xxs md:text-xs text-gray-700 border rounded-[24px] hover:bg-gray-100 bg-[#E1E1E2] tracking-tight"
            >
              Cancel
            </button>

            <button
              onClick={() => onConfirm(selectedMethod!)}
              disabled={!selectedMethod}
              className={`px-4 flex-1 py-2 text-white text-xxs md:text-xs rounded-[24px] tracking-tight ${
                selectedMethod
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Confirm Transfer
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawalMethodModal;