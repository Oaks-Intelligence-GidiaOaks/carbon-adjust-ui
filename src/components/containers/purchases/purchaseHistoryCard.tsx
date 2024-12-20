import { useState } from "react";
import { GoDownload } from "react-icons/go";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { PDFIcon } from "@/assets/icons";
import { formatDate } from "@/lib/utils";
import { Dot } from "lucide-react";
import { useLocation } from "react-router-dom";

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
  _id: string;
  dateOfUpload: string;
  totalEmission: number;
  documentsUploaded: number;
  attachments: Document[];
  emissionData: EmissionData;
  onSelect: (id: string) => void;
  isSelected: boolean;
  scope1Emission: number;
  scope2Emission: number;
  percentageContribution: number;
  scope3Emission: number;
  carbornFootPrint: number;
  optimizationStatus: string;
  transitionScore: number;
};

// PurchaseHistoryCard Component
const PurchaseHistoryCard = ({
  _id,
  dateOfUpload,
  createdAt,
  totalEmission,
  documentsUploaded,
  attachments,
  onSelect,
  status,
  files,
  isSelected,
  scope1Emission,
  scope2Emission,
  percentageContribution,
  scope3Emission,
  transitionScore,
  carbornFootPrint,
  optimizationStatus,
}: PurchaseHistoryCardProps) => {
  const [checked, setChecked] = useState<boolean>(isSelected);
  const [detailsShown, setDetailsShown] = useState<boolean>(false);
  const { pathname } = useLocation();
  const type = pathname.includes("/organisation-staff");

  const toggleChecked = () => {
    setChecked(!checked);
    onSelect(_id);
  };

  const handleDownload = () => {
    attachments.forEach((doc) => {
      const link = document.createElement("a");
      link.href = doc.fileUrl;
      link.download = doc.description;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

    // Round numeric values
    const roundedScope1Emission = Math.ceil(scope1Emission);
    const roundedScope2Emission = Math.ceil(scope2Emission);
    const roundedScope3Emission = Math.ceil(scope3Emission);
    const roundedTransitionScore = Math.ceil(transitionScore);
    const roundedCarbornFootPrint = Math.ceil(carbornFootPrint);
    const roundedPercentageContribution = Math.ceil(percentageContribution);
    const roundedTotalEmission = Math.ceil(totalEmission);


  // Define color classes based on optimization status
  const getStatusStyles = () => {
    switch (optimizationStatus) {
      case "processing":
        return "bg-yellow-100 text-yellow-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "failed":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Render N/A if optimizationStatus is not provided
  const displayedStatus = optimizationStatus || "N/A";

  const emissionData = [
    {
      key: "Scope 1 Emission",
      value: `${roundedScope1Emission} tCO2e`,
    },
    {
      key: "Scope 2 Emission",
      value: `${roundedScope2Emission} tCO2e`,
    },
    {
      key: "Scope 3 Emission",
      value: `${roundedScope3Emission} tCO2e`,
    },
    {
      key: "Emission Score",
      value: `${roundedTransitionScore} tCO2e`,
    },
    {
      key: "Carbon Footprint Tracker",
      value: `${roundedCarbornFootPrint} V`,
    },
    {
      key: "Percentage Contribution",
      value: `${roundedPercentageContribution} %`,
    },
  ];

  return (
    <div className="bg-white border-[0.5px] mb-7 rounded-md shadow-sm flex flex-col md:flex-row p-4 lg:p-6 text-sm lg:text-base cursor-pointer">
       {optimizationStatus === 'completed' && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={toggleChecked}
          className="mr-4"
        />
      )}

      <div className="flex-1">
        {/* Purchase Main Details */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="space-y-1">
            <div>
              <h4 className="font-poppins text-[#212121]">{`${type ? "Approval" : ""} Status`}</h4>
              <span
                className={`pr-3 rounded-2xl font-poppins w-fit text-sm flex items-center ${getStatusStyles()}`}
              >
                <Dot className="size-7" /> {type ? status : displayedStatus}
              </span>
            </div>
          </div>
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
            <p className="text-[#4C5563] break-all text-xs sm:text-sm">{_id}</p>
          </div>
          <div className="ml-5">
            <h4 className="text-[#212121]">Date of upload</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">
              {formatDate(type ? createdAt : dateOfUpload)}
            </p>
          </div>
          <div>
            <h4 className="text-[#212121]">Total Emission</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">{roundedTotalEmission || "N/A"} tCO2e</p>
          </div>
          <div>
            <h4 className="text-[#212121]">Documents Uploaded</h4>
            <p className="text-[#4C5563] text-xs sm:text-sm">
              {type ? files.length : documentsUploaded}
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
                {type ? (
                  <div>
                    {files?.length ? (
                      <ul className="flex flex-row gap-10 items-center">
                        {files.map((doc) => (
                          <li
                            key={doc.id}
                            className="bg-[#FAFAFA] border-[#D8DDE8] p-5 w-[100px] h-[100px] text-xs sm:text-sm"
                          >
                            <PDFIcon />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#767A85]">
                        No documents uploaded
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    {attachments?.length ? (
                      <ul className="flex flex-row gap-10 items-center">
                        {attachments.map((doc) => (
                          <li
                            key={doc.id}
                            className="bg-[#FAFAFA] border-[#D8DDE8] p-5 w-[100px] h-[100px] text-xs sm:text-sm"
                          >
                            <PDFIcon />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#767A85]">
                        No documents uploaded
                      </p>
                    )}
                  </div>
                )}

                {/* Emission Data Section */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {emissionData && emissionData.length > 0 ? (
                    emissionData.map(({ key, value }) => (
                      <div key={key}>
                        <h4 className="text-[#767A85] font-inter text-xs">
                          {key}
                        </h4>
                        <p className="font-semibold text-xs font-inter text-[#1F2026]">
                          {value !== null && value !== undefined
                            ? value
                            : "N/A"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#767A85]">
                      No Emission Data Uploaded
                    </p>
                  )}
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
