import React, { useState } from "react";
import Modal from "./Modal";
import { MdClose } from "react-icons/md";

interface ConfirmPointTransactionModalProps {
  email: string; // User's partially hidden email
  onClose: () => void; // Callback to close the modal
  onConfirm: (otp: string) => void; // Callback when OTP is confirmed
  onResend: () => void; // Callback to resend OTP
  isPending: boolean;
}

const ConfirmPointTransactionModal: React.FC<
  ConfirmPointTransactionModalProps
> = ({ email, onClose, onConfirm, onResend, isPending }) => {
  const [otp, setOtp] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Allow only digits and limit to 6 characters
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <Modal>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[478px] p-6 shadow-lg text-center relative animate-bounceIn mx-4">
          {/* Close Button */}
          <div className="ml-auto w-fit cursor-pointer " onClick={onClose}>
            <MdClose size={20} />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Confirm Transaction
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm mb-6">
            Enter the OTP code sent to your email address{" "}
            <span className="font-semibold">{email}</span>
          </p>

          {/* OTP Input */}
          <div className="mb-4">
            <input
              type="text"
              value={otp}
              onChange={handleInputChange}
              placeholder="Enter Confirmation code (OTP)"
              className="w-full px-4 py-3 text-center border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Resend Link */}
          <p className="text-sm text-gray-500 mb-6">
            Send confirmation code to{" "}
            <button
              onClick={onResend}
              className="text-blue-500 hover:underline focus:outline-none font-medium"
            >
              Phone number
            </button>
          </p>

          {/* Confirm Button */}
          <button
            onClick={() => onConfirm(otp)}
            disabled={otp.length !== 6 || isPending}
            className={`w-full py-3 text-xs text-white rounded-[24px] focus:outline-none ${
              otp.length !== 6 || isPending
                ? "bg-blue-300 cursor-not-allowed"
                : "blue-gradient"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPointTransactionModal;
