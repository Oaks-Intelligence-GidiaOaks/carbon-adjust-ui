import { useState } from "react";
import { GoDownload } from "react-icons/go";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";


// Document and EmissionData types
type Document = {
  id: string;
  description: string;
  fileUrl: string;
  fileType: string;
};

type EmissionData = {
  scope1Emission: string;
  scope2Emission: string;
  scope3Emission: string;
  emissionScore: string;
  carbonFootprintTracker: string;
  percentageContribution: string;
};

type PurchaseHistoryCardProps = {
  id: string;
  dateOfUpload: string;
  totalEmission: number;
  documentsUploaded: number;
  documents: Document[];
  emissionData: EmissionData;
  onSelect: (id: string) => void;
  isSelected: boolean;
};

// PurchaseHistoryCard Component
const PurchaseHistoryCard = ({
  id,
  dateOfUpload,
  totalEmission,
  documentsUploaded,
  documents,
  emissionData,
  onSelect,
  isSelected,
}: PurchaseHistoryCardProps) => {
  const [checked, setChecked] = useState<boolean>(isSelected);
  const [detailsShown, setDetailsShown] = useState<boolean>(false);

  const toggleChecked = () => {
    setChecked(!checked);
    onSelect(id);
  };

  const handleDownload = () => {
    documents.forEach((doc) => {
      const link = document.createElement("a");
      link.href = doc.fileUrl;
      link.download = doc.description;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="bg-white border-[0.5px] mb-7 rounded-md shadow-sm flex flex-col md:flex-row p-4 lg:p-6 text-sm lg:text-base cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleChecked}
        className="mr-4"
      />
      <div className="flex-1">
        {/* Purchase Main Details */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="space-y-1"></div>
          <div className="relative flex justify-between w-full md:w-fit md:items-center lg:space-x-2 mt-2 md:mt-0">
            <button className="text-xl text-[#5D5D5D]">
              <HiDotsVertical />
            </button>
          </div>
        </div>

        <hr className="my-4" />

        {/* Purchase Info Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div>
            <h4 className="text-[#212121]">Purchase ID</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">{id}</p>
          </div>
          <div>
            <h4 className="text-[#212121]">Date of upload</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">{dateOfUpload}</p>
          </div>
          <div>
            <h4 className="text-[#212121]">Total Emission</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">{totalEmission}</p>
          </div>
          <div>
            <h4 className="text-[#212121]">Documents Uploaded</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">
              {documentsUploaded}
            </p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Expand/Collapse Section */}
        {detailsShown && (
          <div className="p-3 flex flex-col md:flex-row items-stretch border-b pb-5">
            <div className="flex flex-col gap-5 mt-4 md:mt-0">
              {/* Documents Section */}
              <div className="flex flex-col lg:flex-row gap-5">
              <div>
                <ul className="flex flex-col lg:flex-row gap-10 items-center">
                  {documents.map((doc) => (
                    <li
                      key={doc.id}
                      className="bg-[#FAFAFA] border-[#D8DDE8] p-5  w-[150px] h-[150px] text-xs sm:text-sm"
                    >
                      {doc.description} ({doc.fileType.toUpperCase()})
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emission Data Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {Object.entries(emissionData).map(([key, value]) => (
                  <div key={key}>
                    <h4 className="text-[#767A85] font-inter text-xs">
                      {key.replace(/([A-Z])/g, " $1")}
                    </h4>
                    <p className="font-semibold text-xs font-inter text-[#1F2026]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              </div>

              <button
                onClick={handleDownload}
                className="flex-center w-fit text-xs gap-2 py-[6px] px-5 border rounded-3xl bg-[#4D94FE] text-white hover:bg-blue-600 mt-4"
              >
                <GoDownload />
                <span>Download All</span>
              </button>
            </div>
          </div>
        )}

        {/* Collapse/Expand Button */}
        <div className="items-center justify-center flex pt-4">
          <p
            onClick={(e) => {
              e.stopPropagation();
              setDetailsShown(!detailsShown);
            }}
            className="flex items-center justify-center gap-2 font-open-sans cursor-pointer text-sm text-[#212121]"
          >
            <span>{detailsShown ? "Collapse" : "Expand"}</span>
            {detailsShown ? (
              <MdOutlineKeyboardArrowUp className="size-5" />
            ) : (
              <MdOutlineKeyboardArrowDown className="size-5" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};


export default PurchaseHistoryCard;