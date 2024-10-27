import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

type Building = {
  id: string;
  address: string;
  houseType: string;
  powerRating: string;
  voltageLevel?: string;
  imageUrl: string;
};

const buildings: Building[] = [
  {
    id: "D8674e99-de33S",
    address: "Fulham rd.",
    houseType: "Duplex",
    powerRating: "A",
    voltageLevel: "120 Volts",
    imageUrl: "https://example.com/building1.jpg",
  },
  {
    id: "D8R346TH-de34S",
    address: "Fulham rd.",
    houseType: "Duplex",
    powerRating: "B",
    voltageLevel: "120 Volts",
    imageUrl: "https://example.com/building2.jpg",
  },
  {
    id: "D823RY6D-de35S",
    address: "Fulham rd.",
    houseType: "Duplex",
    powerRating: "B",
    voltageLevel: "120 Volts",
    imageUrl: "https://example.com/building3.jpg",
  },
];



export const LinkDeviceModal: React.FC<{ onClose: () => void; onLink: (building: Building) => void }> = ({ onClose, onLink }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 z-50">
      <div className="relative bg-white w-full max-w-xl p-6 rounded-lg shadow-lg max-h-[90vh]">
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-white z-10 pb-4">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <IoClose className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold">Available Buildings</h2>
        </div>

        {/* Scrollable Building List */}
        <div className="mt-4 space-y-4 overflow-auto max-h-[70vh]">
          {buildings.map((building) => (
            <div key={building.id} className="border rounded-lg">
              <div className="flex justify-between p-3 border-b">
                <span className="font-poppins font-bold">{building.id}</span>
                <button className="text-gray-500 hover:text-gray-700">
                  <HiDotsVertical className="h-6 w-6" />
                </button>
              </div>
              <div className="flex gap-10 mt-5 px-4 py-2">
                <div className="w-[200px] h-[200px] border bg-gray-300">
                  {/* <img
                    src={building.imageUrl}
                    alt={`Building ${building.id}`}
                    className="w-24 h-24 rounded-md object-cover"
                  /> */}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-5 mt-4 md:mt-0">
                    <div className="flex flex-wrap gap-10">
                      <div>
                        <h4 className="text-[#767A85] font-inter text-xs">Address</h4>
                        <p className="font-semibold text-xs font-inter text-[#1F2026]">
                          {building.address}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[#767A85] font-inter text-xs">Power rating:</h4>
                        <p className="font-semibold text-xs font-inter text-[#1F2026]">
                          {building.powerRating}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-8">
                      <div>
                        <h4 className="text-[#767A85] font-inter text-xs">Voltage level</h4>
                        <p className="font-semibold text-xs font-inter text-[#1F2026]">
                          {building.voltageLevel} V
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[#767A85] font-inter text-xs">House type:</h4>
                        <p className="font-semibold text-xs font-inter text-[#1F2026]">
                          {building.houseType}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="bg-blue-500 mt-10 text-white px-14 py-2 rounded-full shadow hover:bg-blue-600"
                    onClick={() => onLink(building)}
                  >
                    Link
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ConfirmModal: React.FC<{
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }> = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl text-center font-semibold mb-4 text-[#333333]">Confirm Device Link</h2>
        <p className="mb-6 text-center text-[#575757] ">{message}</p>
        <div className="flex w-full gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 w-full border text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 w-full blue-gradient text-white rounded-md"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );



