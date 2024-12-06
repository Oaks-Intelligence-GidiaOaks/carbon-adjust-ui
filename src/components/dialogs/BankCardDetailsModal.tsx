import React from "react";
import Modal from "./Modal";

interface BankCardDetailsProps {
  goBack: () => void;
  verify: () => void;
}

const BankCardDetails: React.FC<BankCardDetailsProps> = ({
  goBack,
  verify,
}) => {
  return (
    <Modal>
      <div className="flex justify-center items-center w-full min-h-screen bg-transparent font-kumbh">
        <div className="bg-white max-h-[500px] overflow-y-scroll scrollbar-hide shadow-md rounded-lg p-8 pt-0 w-full md:w-[650px] animate-bounceIn mx-5">
          {/* Back Button */}
          <div className="bg-white sticky top-0 pt-5">
            <button onClick={goBack} className="text-blue-500  text-sm mb-4">
              &larr; Back
            </button>
          </div>

          {/* Current Details Section */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h4 className="text-gray-700 font-medium">Current details</h4>

            <div className=" text-gray-600 mt-2 space-y-2 grid grid-cols-2 text-xs">
              <div className="flex flex-col gap-1">
                <span className="uppercase">Card Number</span>
                <span className="font-[700] text-xs text-[#2C2C2C]">
                  3489 XXXX XXXX XXXX
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="uppercase">Card Type</span>
                <span className="font-[700] text-xs text-[#2C2C2C]">
                  Mastercard
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="uppercase">Owner Name</span>
                <span className="font-[700] text-xs text-[#2C2C2C]">
                  James Gardner
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="uppercase">Expiry Date</span>
                <span className="font-[700] text-xs text-[#2C2C2C]">07/25</span>
              </div>
            </div>
          </div>

          {/* Card Details Form */}
          <div>
            <h4 className="text-gray-700 font-medium mb-2">Card details</h4>
            <p className="font-[400] text-[#8083A3] mb-4">
              This is where your earnings will be paid into
            </p>

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
              onClick={verify}
              type="submit"
              className="mt-6 w-fit text-white rounded-[24px] px-8 md:w-1/4 blue-gradient py-2 font-medium hover:bg-blue-600"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BankCardDetails;
