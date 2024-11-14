import UploadPurchaseDocumentModal from "@/components/dialogs/PurchaseDoc";
import { useState } from "react";
import Bucket from "@/assets/icons/shopping.svg";

// PurchasesEmptyState Component
const PurchasesEmptyState: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
  
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 mt-5">
          <img src={Bucket} alt="bucket" className="w-40 h-40" />
        </div>
        <h2 className="text-2xl text-center font-semibold text-[#495057] font-poppins mb-5">
          No order list
        </h2>
        <p className="text-[#6C6262] text-center font-poppins mb-6">
          You have not made any purchases
        </p>
        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex items-center px-4 py-2 blue-gradient text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Upload document
        </button>
        <UploadPurchaseDocumentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    );
  };

  export default PurchasesEmptyState;