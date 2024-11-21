import React from "react";
import Modal from "./Modal";

const PayoutBankDetailsModal: React.FC = () => {
  return (
    <Modal>
      <div className="flex justify-center items-center w-full min-h-screen bg-transparent">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          {/* Back Button */}
          <button className="text-blue-500 text-sm mb-4">&larr; Back</button>

          {/* Current Details Section */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h4 className="text-gray-700 font-medium">Current details</h4>
            <div className="text-sm text-gray-600 mt-2 space-y-2">
              <p>
                <strong>Account Number:</strong> 987654321
              </p>
              <p>
                <strong>Bank Name:</strong> First National Bank
              </p>
              <p>
                <strong>ABA Routing Number:</strong> 123456789
              </p>
              <p>
                <strong>Account Holder Name:</strong> James Gardner
              </p>
            </div>
          </div>

          {/* Payout Bank Details Form */}
          <form>
            <h4 className="text-gray-700 font-medium mb-4">
              Payout Bank details
            </h4>

            {/* Bank Name */}
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm mb-1"
                htmlFor="bank-name"
              >
                Bank Name
              </label>
              <input
                type="text"
                id="bank-name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-blue-300"
                placeholder="Enter bank name"
              />
            </div>

            {/* Account Holder Name */}
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm mb-1"
                htmlFor="account-holder-name"
              >
                Account Holder Name
              </label>
              <input
                type="text"
                id="account-holder-name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-blue-300"
                placeholder="Enter name"
              />
            </div>

            {/* Account Number */}
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm mb-1"
                htmlFor="account-number"
              >
                Account Number
              </label>
              <input
                type="text"
                id="account-number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-blue-300"
                placeholder="Enter account number"
              />
            </div>

            {/* ABA/Routing Number */}
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm mb-1"
                htmlFor="routing-number"
              >
                ABA/Routing Number
              </label>
              <input
                type="text"
                id="routing-number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-blue-300"
                placeholder="Input number"
              />
            </div>

            {/* Terms and Conditions */}
            <p className="text-xs text-gray-500 mt-4">
              To add your card details, you have read and agreed to
              Carbon-adjust’s{" "}
              <a href="#" className="text-blue-500">
                privacy policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500">
                terms of service
              </a>
              .
            </p>

            {/* Verify Button */}
            <button
              type="submit"
              className="mt-6 w-full bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-600"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default PayoutBankDetailsModal;
