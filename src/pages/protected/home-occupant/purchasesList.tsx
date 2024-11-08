import { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { GoDownload } from "react-icons/go";

const PurchaseCard = ({
  id,
  uploadDate,
  totalEmission,
  documentsUploaded,
  documents,
}: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border rounded-md shadow p-4 mb-6">
      {/* Main Summary Section */}
      <div className="flex justify-between items-center">
        <input type="checkbox" className="mr-4" />
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold">ID</h4>
            <p className="text-gray-600 text-xs">{id}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Date of upload</h4>
            <p className="text-gray-600 text-xs">{uploadDate}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Total Emission</h4>
            <p className="text-gray-600 text-xs">{totalEmission}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Documents Uploaded</h4>
            <p className="text-gray-600 text-xs">{documentsUploaded}</p>
          </div>
        </div>
        <button onClick={toggleExpand} className="text-blue-600 text-sm">
          {isExpanded ? "Collapse" : "Expand"}{" "}
          {isExpanded ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
        </button>
      </div>

      {/* Expanded Details Section */}
      {isExpanded && (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {documents.map((doc: any, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <img src={doc.icon} alt="Document" className="w-6 h-6" />
                <p className="text-xs text-gray-600">{doc.name}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-xs text-gray-600">
              <p>Scope 1 emission: 532,798 tCO2e</p>
              <p>Scope 2 emission: 532,798 tCO2e</p>
              <p>Scope 3 emission: 532,798 tCO2e</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
              <GoDownload className="mr-2" />
              Download all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const PurchaseList = () => {
  const purchases = [
    {
      id: "d8674e99-de33...",
      uploadDate: "12/06/2024",
      totalEmission: 100,
      documentsUploaded: 2,
      documents: [
        { name: "Receipt", icon: "/path/to/receipt-icon.png" },
        { name: "Invoice", icon: "/path/to/invoice-icon.png" },
      ],
    },
  ];

  return (
    <div className="p-6">
      {purchases.map((purchase, index) => (
        <PurchaseCard key={index} {...purchase} />
      ))}
    </div>
  );
};

export default PurchaseList;
