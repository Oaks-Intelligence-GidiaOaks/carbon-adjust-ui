import { useState } from "react";
import { GoDownload } from "react-icons/go";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { PencilIcon, UploadIcon } from "lucide-react";
import UploadEnergyBillsModal from "@/components/reusables/UploadEnergyBills";
import UploadBuildingImageModal from "./BuildingImageUpload";
import EnergyBillsModal from "./EnergyBillsModal";
import { FiUpload } from "react-icons/fi";

const BuildingHistoryCard = ({
  serialNumber,
  id,
  address,
  houseType,
  occupants,
  energySource,
  image,
  voltageLevel,
  floors,
  postCode,
  city,
  onSelect, // New prop
  isSelected, // New prop
}: any) => {

  const [checked, setChecked] = useState<boolean>(isSelected);
  const [buildingShown, setBuildingShown] = useState<boolean>(false);

  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isEnergyModalOpen, setIsEnergyModalOpen] = useState<boolean>(false);
  const [toggleOptions, setToggleOptions] = useState<boolean>(false);
  const [isEnergyBillsModalOpen, setEnergyBillsModalOpen] =
    useState<boolean>(false);

    const toggleChecked = () => {
      setChecked(!checked);
      onSelect(id);
    };

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Handle download logic
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
    setToggleOptions(false);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const openEnergyModal = () => {
    setIsEnergyModalOpen(true);
  };

  const closeEnergyModal = () => {
    setIsEnergyModalOpen(false);
  };

  const openEnergyBillsModal = () => {
    setEnergyBillsModalOpen(true);
    setToggleOptions(false);
  };

  const closeEnergyBillsModal = () => setEnergyBillsModalOpen(false);

  const handleToggleOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setToggleOptions((prev) => !prev);
  };

  return (
    <div className="bg-white border-[0.5px] mb-7 rounded-md shadow-sm flex flex-col md:flex-row p-4 lg:p-6 text-sm lg:text-base cursor-pointer">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={toggleChecked}
        className="mr-4"
      />

      <div className="flex-1">
        {/* Building Main Details */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="space-y-1">
            <h4 className="font-poppins text-[#212121]">Serial Number</h4>
            <p className="font-semibold font-poppins text-[#4C5563] text-sm">
              {serialNumber}
            </p>
          </div>

          <div className="relative flex justify-between w-full md:w-fit md:items-center lg:space-x-2 mt-2 md:mt-0">
            <button
              onClick={openEnergyModal}
              className="text-[#3465AF] border border-[#3465AF] py-2 px-4 rounded-full text-xs md:text-sm font-medium flex items-center space-x-2"
            >
              <UploadIcon className="w-4 h-4" />
              <span>Upload energy bill</span>
            </button>
            <button
              onClick={handleToggleOptions}
              className="text-xl text-[#5D5D5D]"
            >
              <HiDotsVertical />
            </button>

            {/* Dropdown Options */}
            {toggleOptions && (
              <div className="absolute top-8 right-0 bg-white border rounded shadow-md z-10 py-2 w-[160px]">
                <button
                  onClick={openImageModal}
                  className="flex gap-2 items-center justify-center  w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                >
                 <FiUpload  size={12} /> Upload Image
                </button>
                <button
                  onClick={openEnergyBillsModal}
                  className="flex gap-2 items-center justify-center  w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                >
                 <PencilIcon size={12}/> Edit Energy Bills
                </button>
              </div>
            )}
          </div>
        </div>

        <hr className="my-4" />

        {/* Building Info Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <div>
            <h4 className="text-[#212121]">ID</h4>
            <p className="text-[#4C5563] break-all text-xs sm:text-sm">{id}</p>
          </div>
          <div>
            <h4 className="text-[#212121]">Address</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">{address}</p>
          </div>
          <div>
            <h4 className="text-[#212121]">House type</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">{houseType}</p>
          </div>
          <div>
            <h4 className="text-[#212121]">Occupants</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">{occupants}</p>
          </div>
          <div>
            <h4 className="text-[#212121]">Energy source</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">{energySource}</p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Expand/Collapse Section */}
        {buildingShown && (
          <div className="p-3 flex w-full flex-col md:flex-row items-stretch border-b pb-5">
            {image ? (
              <img
                src={image}
                alt="Building"
                className="w-1/2 md:w-[150px] h-[150px] rounded-md object-cover"
              />
            ) : (
              <div className="w-1/2 text-m md:w-[150px] h-[150px] flex items-center  rounded-md bg-gray-200 text-gray-500">
                No image available
              </div>
            )}
            <div className="flex ml-0 md:ml-5 flex-col gap-5 mt-4 md:mt-0">
              <div className="flex flex-wrap gap-3">
                <div>
                  <h4 className="text-[#767A85] font-inter text-xs">Address</h4>
                  <p className="font-semibold text-xs font-inter text-[#1F2026]">
                    {address}
                  </p>
                </div>
                <div>
                  <h4 className="text-[#767A85] font-inter text-xs">City</h4>
                  <p className="font-semibold text-xs font-inter text-[#1F2026]">
                    {city}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <div>
                  <h4 className="text-[#767A85] font-inter text-xs">
                    Voltage level
                  </h4>
                  <p className="font-semibold text-xs font-inter text-[#1F2026]">
                    {voltageLevel} V
                  </p>
                </div>
                <div>
                  <h4 className="text-[#767A85] font-inter text-xs">
                    No. of floors
                  </h4>
                  <p className="font-semibold text-xs font-inter text-[#1F2026]">
                    {floors} Floors
                  </p>
                </div>
                <div>
                  <h4 className="text-[#767A85] font-inter text-xs">
                    Post code
                  </h4>
                  <p className="font-semibold text-xs font-inter text-[#1F2026]">
                    {postCode}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="flex-center w-fit text-xs gap-2 py-[6px] px-5 border rounded-3xl bg-[#4D94FE] text-white hover:bg-blue-600"
              >
                <GoDownload />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}

        {/* Collapse/Expand Button */}
        <div className="items-center justify-center flex pt-4">
          <p
            onClick={(e) => {
              e.stopPropagation();
              setBuildingShown(!buildingShown);
            }}
            className="flex items-center justify-center gap-2 font-open-sans cursor-pointer text-sm text-[#212121]"
          >
            <span>{buildingShown ? "Collapse" : "Expand"}</span>
            {buildingShown ? (
              <MdOutlineKeyboardArrowUp className="size-5" />
            ) : (
              <MdOutlineKeyboardArrowDown className="size-5" />
            )}
          </p>
        </div>
      </div>

      {/* Upload Energy Bills Modal */}
      {isEnergyModalOpen && (
        <UploadEnergyBillsModal
          isOpen={isEnergyModalOpen}
          onClose={closeEnergyModal}
          buildingId={id}
        />
      )}

      {/* Upload Building Image Modal */}
      {isImageModalOpen && (
        <UploadBuildingImageModal
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
          buildingId={id}
        />
      )}

      {isEnergyBillsModalOpen && (
        <EnergyBillsModal
          isOpen={isEnergyBillsModalOpen}
          closeModal={closeEnergyBillsModal}
          buildingId={id}
        />
      )}
    </div>
  );
};

export default BuildingHistoryCard;
