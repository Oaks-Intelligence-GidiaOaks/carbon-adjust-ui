import React from "react";
import Modal from "./Modal";

const BankCardDetails: React.FC = () => {
  return (
    <Modal>
      <div className="flex justify-center items-center w-full min-h-screen bg-transparent">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          {/* Back Button */}
          <button className="text-blue-500 text-sm mb-4">&larr; Back</button>

          {/* Current Details Section */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h4 className="text-gray-700 font-medium">Current details</h4>
            <div className="text-sm text-gray-600 mt-2">
              <p>
                <strong>Card Number:</strong> 3489 XXXX XXXX XXXX
              </p>
              <p>
                <strong>Card Type:</strong> Mastercard
              </p>
              <p>
                <strong>Owner Name:</strong> James Gardner
              </p>
              <p>
                <strong>Expiry Date:</strong> 07/25
              </p>
            </div>
          </div>

          {/* Card Details Form */}
          <form>
            <h4 className="text-gray-700 font-medium mb-4">Card details</h4>
            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <label
                  className="block text-gray-600 text-sm mb-1"
                  htmlFor="card-number"
                >
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="card-number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-blue-300"
                    placeholder="5399 0000 0000 0000"
                  />
                  <span className="absolute right-4 top-2.5 text-xl text-gray-400">
                    <i className="fab fa-cc-mastercard"></i>
                  </span>
                </div>
              </div>

              {/* Expiration Date and CVV */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    className="block text-gray-600 text-sm mb-1"
                    htmlFor="expiry-date"
                  >
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    id="expiry-date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-blue-300"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    className="block text-gray-600 text-sm mb-1"
                    htmlFor="cvv"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring focus:ring-blue-300"
                    placeholder="***"
                  />
                </div>
              </div>
            </div>

            {/* Save Card Checkbox */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="save-card"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="save-card" className="ml-2 text-sm text-gray-600">
                Save card details
              </label>
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

export default BankCardDetails;
