import { useState } from "react";
import { GoDownload } from "react-icons/go";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { UploadCloud, UploadIcon } from "lucide-react";


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
}: any) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [buildingShown, setBuildingShown] = useState<boolean>(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Handle download logic
  };

  return (
    <div className="bg-white border-[0.5px] rounded-md shadow-sm flex p-4 lg:p-6 text-sm lg:text-base cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleChecked}
        className="mr-4"
      />

      <div className="flex-1">
        {/* Building Main Details */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="font-poppins text-[#212121]">Serial Number</h4>
            <p className="font-semibold font-poppins text-[#4C5563] text-sm">{serialNumber}</p>
          </div>
          <div className="flex items-center space-x-2">
                <button className=" text-[#3465AF] border border-[#3465AF] py-2 px-4 rounded-full text-sm font-medium flex items-center space-x-2">
                  <UploadIcon  className="w-4 h-4"/>
                  <span>Upload energy bill</span>
                </button>
                <button className="text-xl text-[#5D5D5D]">
            <HiDotsVertical />
          </button>
        </div>
          
        </div>

        <hr className="my-4" />

        {/* Building Info Section */}
        <div className="grid grid-cols-2 font-poppins lg:grid-cols-5 gap-4">
          <div>
            <h4 className="text-[#212121]">ID</h4>
            <p className="text-[#4C5563] text-sm">{id}</p>
          </div>
          <div>
            <h4 className="text-[#212121]">Address</h4>
            <p className="text-[#4C5563] text-sm">{address}</p>
          </div>
          <div>
          <h4 className="text-[#212121]">House type</h4>
            <p className="text-[#4C5563] text-sm">{houseType}</p>
          </div>
          <div>
          <h4 className="text-[#212121]">Occupants</h4>
            <p className="text-[#4C5563] text-sm">{occupants}</p>
          </div>
          <div>
          <h4 className="text-[#212121]">Energy source</h4>
            <p className="text-[#4C5563] text-sm">{energySource}</p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Expand/Collapse Section */}
        {buildingShown && (
          <div className="p-3 flex items-stretch border-b pb-5">
            <img
              src={image}
              alt="Building"
              className="w-[150px] h-full rounded-md"
            />
            <div className="flex ml-5 flex-col gap-5">
              <div className="flex gap-3">
                <div>
                  <h4 className="text-[#767A85] font-inter text-xs">Address</h4>
                  <p className="font-semibold text-xs font-inter text-[#1F2026]">{address} </p>
                </div>
                <div>
                  <h4 className="text-[#767A85] font-inter text-xs">City</h4>
                  <p className="font-semibold text-xs font-inter text-[#1F2026]">{city}</p>
                </div>
              </div>
              <div className="flex  gap-3">
                <div>
                  <h4 className="text-[#767A85] font-inter text-xs">Voltage level</h4>
                  <p className="font-semibold text-xs font-inter text-[#1F2026]">{voltageLevel} V</p>
                </div>
                <div>
                  <h4 className="text-[#767A85] font-inter text-xs">No. of floors</h4>
                  <p className="font-semibold text-xs font-inter text-[#1F2026]">{floors} Floors</p>
                </div>
                <div>
                  <h4 className="text-[#767A85] font-inter text-xs">Post code</h4>
                  <p className="font-semibold text-xs font-inter text-[#1F2026]">{postCode}</p>
                </div>
              </div>
              <button
              onClick={handleDownload}
              className="flex-center  w-fit text-xs gap-2 py-[6px] px-5 border rounded-3xl bg-[#4D94FE] text-white hover:bg-blue-600"
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
              <MdOutlineKeyboardArrowUp  className="size-5"/>
            ) : (
              <MdOutlineKeyboardArrowDown className="size-5"/>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuildingHistoryCard;
