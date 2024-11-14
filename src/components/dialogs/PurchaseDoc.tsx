import { IoClose } from "react-icons/io5";
import { useState } from "react";
import uploadfileIcon from "@/assets/icons/upload-file.svg";
import { FaTrashCan } from "react-icons/fa6";
import FileUpload from "@/components/reusables/FileUpload";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildingId: string;
}

const UploadPurchaseDocumentModal: React.FC<ModalProps> = ({ isOpen, onClose, buildingId }) => {
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInvoiceUpload = (file: File | File[] | null) => {
    if (file && !Array.isArray(file)) {
      setInvoiceFile(file);
    }
  };

  const handleReceiptUpload = (file: File | File[] | null) => {
    if (file && !Array.isArray(file)) {
      setReceiptFile(file);
    }
  };

  const handleFileRemove = (type: "invoice" | "receipt") => {
    if (type === "invoice") {
      setInvoiceFile(null);
    } else if (type === "receipt") {
      setReceiptFile(null);
    }
  };

  const handleProcess = () => {
    setShowConfirmation(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg max-h-full">
        <button onClick={onClose} className="absolute top-2 right-4 text-black hover:text-gray-700">
          <IoClose className="size-5 text-gray-400" />
        </button>

        <h1 className="text-2xl font-bold text-center mt-6 text-[#495057]">
          {showConfirmation ? "Confirmation" : "Upload Documents"}
        </h1>

        <div className="mt-4 overflow-y-auto max-h-[60vh] px-6 pb-6">
          {showConfirmation ? (
            // Confirmation Message
            <div className="text-center mt-8">
              <p className="text-lg mb-6">Your details has been submitted successfully!</p>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  onClose();
                }}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
              >
                Okay
              </button>
            </div>
          ) : (
            // File Upload Form
            <>
              <div className="mt-5">
                <FileUpload
                  title="Upload Invoice"
                  uploadedFile={null}
                  onFileUpload={handleInvoiceUpload}
                  acceptedFileTypes=".jpg, .png, .jpeg"
                />
                <FileUpload
                  title="Upload Receipt"
                  uploadedFile={null}
                  onFileUpload={handleReceiptUpload}
                  acceptedFileTypes=".jpg, .png, .jpeg"
                />
              </div>

              {invoiceFile && (
                <div className="mt-5">
                  <div className="mb-4 p-6 flex gap-2 w-full items-center justify-center border-2 border-dashed border-[#C9C3C3]">
                    <img src={uploadfileIcon} alt="" className="size-8" />
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700 break-all">{invoiceFile.name}</p>
                      </div>
                      <p className="text-xs text-gray-500">{(invoiceFile.size / 1024).toFixed(2)} KB</p>
                      <div className="flex gap-2 items-center justify-center">
                        <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                          <div className="bg-[#139EEC] h-2 rounded-lg w-full"></div>
                        </div>
                        <button
                          onClick={() => handleFileRemove("invoice")}
                          className="text-[#A1A4B1] hover:text-red-600"
                        >
                          <FaTrashCan className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {receiptFile && (
                <div className="mt-5">
                  <div className="mb-4 p-6 flex gap-2 w-full items-center justify-center border-2 border-dashed border-[#C9C3C3]">
                    <img src={uploadfileIcon} alt="" className="size-8" />
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700 break-all">{receiptFile.name}</p>
                      </div>
                      <p className="text-xs text-gray-500">{(receiptFile.size / 1024).toFixed(2)} KB</p>
                      <div className="flex gap-2 items-center justify-center">
                        <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                          <div className="bg-[#139EEC] h-2 rounded-lg w-full"></div>
                        </div>
                        <button
                          onClick={() => handleFileRemove("receipt")}
                          className="text-[#A1A4B1] hover:text-red-600"
                        >
                          <FaTrashCan className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {!showConfirmation && (
          <div className="px-6 pb-6">
            <button
              onClick={handleProcess}
              className={`mt-8 w-full text-white py-2 rounded-lg flex justify-center items-center ${
                (!invoiceFile && !receiptFile)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "blue-gradient hover:bg-blue-700"
              }`}
              disabled={!invoiceFile && !receiptFile}
            >
              Process
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPurchaseDocumentModal;
