import PurchasesEmptyState from "@/components/containers/purchases/emptyState";
import PurchaseHistoryCard from "@/components/containers/purchases/purchaseHistoryCard";
import UploadPurchaseDocumentModal from "@/components/dialogs/PurchaseDoc";
import { PlusCircleIcon, Search } from "lucide-react";
import { useState } from "react";
import { MdFilterList } from "react-icons/md";

// Combined PurchaseList Component
const PurchaseList = () => {
  const purchases = [
    {
      id: "PUR-001",
      dateOfUpload: "2023-11-01",
      totalEmission: 1200,
      documentsUploaded: 2,
      documents: [
        {
          id: "DOC-001",
          description: "Invoice",
          fileUrl: "/files/invoice.pdf",
          fileType: "pdf",
        },
        {
          id: "DOC-002",
          description: "Receipt",
          fileUrl: "/files/receipt.pdf",
          fileType: "pdf",
        },
      ],
      emissionData: {
        scope1Emission: "300 kg CO2",
        scope2Emission: "400 kg CO2",
        scope3Emission: "500 kg CO2",
        emissionScore: "85%",
        carbonFootprintTracker: "High",
        percentageContribution: "40%",
      },
      onDownloadAll: () => console.log("Download all for PUR-001"),
      onSelect: (id: any) => console.log("Selected purchase ID:", id),
      isSelected: false,
    },
    {
      id: "PUR-002",
      dateOfUpload: "2023-10-15",
      totalEmission: 1500,
      documentsUploaded: 1,
      documents: [
        {
          id: "DOC-003",
          description: "Bill of Lading",
          fileUrl: "/files/bill-of-lading.pdf",
          fileType: "pdf",
        },
      ],
      emissionData: {
        scope1Emission: "500 kg CO2",
        scope2Emission: "600 kg CO2",
        scope3Emission: "400 kg CO2",
        emissionScore: "90%",
        carbonFootprintTracker: "Medium",
        percentageContribution: "30%",
      },
      onDownloadAll: () => console.log("Download all for PUR-002"),
      onSelect: (id: any) => console.log("Selected purchase ID:", id),
      isSelected: false,
    },
    {
      id: "PUR-003",
      dateOfUpload: "2023-09-30",
      totalEmission: 1000,
      documentsUploaded: 3,
      documents: [
        {
          id: "DOC-004",
          description: "Purchase Order",
          fileUrl: "/files/purchase-order.pdf",
          fileType: "pdf",
        },
        {
          id: "DOC-005",
          description: "Invoice",
          fileUrl: "/files/invoice-2.pdf",
          fileType: "pdf",
        },
        {
          id: "DOC-006",
          description: "Certificate of Origin",
          fileUrl: "/files/certificate-of-origin.pdf",
          fileType: "pdf",
        },
      ],
      emissionData: {
        scope1Emission: "200 kg CO2",
        scope2Emission: "300 kg CO2",
        scope3Emission: "500 kg CO2",
        emissionScore: "70%",
        carbonFootprintTracker: "Low",
        percentageContribution: "20%",
      },
      onDownloadAll: () => console.log("Download all for PUR-003"),
      onSelect: (id: any) => console.log("Selected purchase ID:", id),
      isSelected: false,
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-6">
      <div className="h-[150px]  bg-[#F5FAFF] flex items-center justify-between pl-6 lg:pl-[50px]">
        <h2 className="font-[500] text-xl">Purchases</h2>
      </div>

      {/* Search, Filter, and Upload Section */}
      <div className="flex flex-col px-10  sm:flex-row sm:items-center sm:justify-between my-6">
        <div className="flex items-center space-x-4">
          {/* Toggle Date Picker */}
          <div className="relative">
            <button
              className="bg-white text-[#575757] border p-2 rounded-lg flex items-center space-x-2"
              onClick={() => setIsDatePickerVisible((prev) => !prev)}
            >
              <MdFilterList className="w-4 h-4" />
              <span className=" hidden md:block text-sm font-medium text-[#575757]">
                Filter by date
              </span>
            </button>

            {/* Date Picker */}
            {isDatePickerVisible && (
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="absolute border text-sm font-inter p-1.5 shadow-lg w-full"
              />
            )}
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border w-[200px] lg:w-[300px] bg-white text-sm text-[#575757] rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-3 text-[#575757] left-4 size-4" />
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center mt-4 sm:mt-0 w-fit gap-2 blue-gradient text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition"
        >
          <span>Upload Documents</span>
          <PlusCircleIcon className="h-5 w-5 ml-2" />
        </button>
      </div>

      {purchases.length > 0 ? (
        purchases.map((purchase) => (
          <div className="px-2 md:px-10 lg:w-full mx-auto mt-[10px] space-y-[38px]">
            <PurchaseHistoryCard
              key={purchase.id}
              {...purchase}
              isSelected={false}
              onSelect={(id) => console.log("Selected purchase ID:", id)}
            />
          </div>
        ))
      ) : (
        <PurchasesEmptyState />
      )}

      {/* Modal */}
      {isModalOpen && (
        <UploadPurchaseDocumentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          buildingId={""}
        />
      )}
    </div>
  );
};

export default PurchaseList;
