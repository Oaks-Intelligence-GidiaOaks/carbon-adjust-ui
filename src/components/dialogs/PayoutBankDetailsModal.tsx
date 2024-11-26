import React from "react";
import Modal from "./Modal";

interface PayoutBankDetailsModalProps {
  goBack: () => void;
  verify: () => void;
}

const PayoutBankDetailsModal: React.FC<PayoutBankDetailsModalProps> = ({
  goBack,
  verify,
}) => {
  return (
    <Modal>
      <div className="flex justify-center relative items-center w-full min-h-screen bg-transparent font-kumbh">
        <div className="bg-white max-h-[500px] overflow-y-scroll scrollbar-hide shadow-md rounded-lg pt-0 p-5 md:p-8 md:pt-0 w-full md:w-[650px] animate-bounceIn mx-5">
          {/* Back Button */}
          <div className="bg-white sticky top-0 pt-6">
            <button onClick={goBack} className="text-blue-500  text-sm mb-4">
              &larr; Back
            </button>
          </div>

          {/* Current Details Section */}
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h4 className="font-medium text-[#21A0FC]">Current details</h4>

            <div className=" text-gray-600 mt-2 space-y-2 grid grid-cols-2 text-xs">
              <div className="flex flex-col gap-1">
                <span className="uppercase">Account Number</span>
                <span className="font-[700] text-xs text-[#2C2C2C]">
                  987654321
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="uppercase">Bank Name:</span>
                <span className="font-[700] text-xs text-[#2C2C2C]">
                  First National Bank
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="uppercase">Account Holder Name</span>
                <span className="font-[700] text-xs text-[#2C2C2C]">
                  James Gardner
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="uppercase">ABA Routing Number</span>
                <span className="font-[700] text-xs text-[#2C2C2C]">
                  123456789
                </span>
              </div>
            </div>
          </div>

          {/* Payout Bank Details Form */}
          <div>
            <h4 className="text-gray-700 font-medium mb-2 ">
              Payout Bank details
            </h4>

            <p className="font-[400] text-[#8083A3] mb-4">
              This is where your earnings will be paid into
            </p>

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

export default PayoutBankDetailsModal;
