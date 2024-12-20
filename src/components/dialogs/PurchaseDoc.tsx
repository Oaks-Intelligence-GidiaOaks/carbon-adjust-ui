import { IoClose } from "react-icons/io5";
import { useState, useRef } from "react";
import uploadfileIcon from "@/assets/icons/upload-file.svg";
import { FaTrashCan } from "react-icons/fa6";
import FileUpload from "@/components/reusables/FileUpload";
import toast from "react-hot-toast";
import { uploadPurchasesData } from "@/services/homeOwner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  UploadReceiptData } from "@/services/organisation";
import { useLocation } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadPurchaseDocumentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const queryClient = useQueryClient();

  // Create a ref to the uploaded file container
  const uploadedFileContainerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const type = pathname.includes("/organisation-staff");

  // const { data: units } = useQuery({
  //   queryKey: ["get units"],
  //   queryFn: AllUnits,
  // });

  const uploadPurchasesDataMutation = useMutation({
    mutationKey: ["uploadPurchasesData"],
    mutationFn: (formData: FormData) => uploadPurchasesData(formData),
    onSuccess: () => {
      toast.success("Purchases Data uploaded successfully.");
      onClose();
    },
    onError: (err: any) => {
      const errorMessage =
        err.response?.data?.message || "An unknown error occurred";
      let formattedMessages = [];

      try {
        const parsedMessages = JSON.parse(errorMessage);
        formattedMessages = parsedMessages.map((msg: any) => msg.message);
      } catch (e) {
        formattedMessages = [errorMessage];
      }

      toast.error(`${formattedMessages.join(", ")}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases-data"] });
    },
  });

  const uploadStaffPurchasesDataMutation = useMutation({
    mutationKey: ["uploadStaffPurchasesData"],
    mutationFn: (formData: FormData) => UploadReceiptData(formData),
    onSuccess: () => {
      toast.success("Purchases Data uploaded successfully.");
      onClose();
    },
    onError: (err: any) => {
      const errorMessage =
        err.response?.data?.message || "An unknown error occurred";
      let formattedMessages = [];

      try {
        const parsedMessages = JSON.parse(errorMessage);
        formattedMessages = parsedMessages.map((msg: any) => msg.message);
      } catch (e) {
        formattedMessages = [errorMessage];
      }

      toast.error(`${formattedMessages.join(", ")}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myRequests"] });
    },
  });

  const handleFileUpload = (
    type: "invoice" | "receipt",
    file: File | File[] | null
  ) => {
    if (!file || Array.isArray(file)) return;
    type === "invoice" ? setInvoiceFile(file) : setReceiptFile(file);

    // Scroll to the uploaded file container after file selection
    if (uploadedFileContainerRef.current) {
      uploadedFileContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileRemove = (type: "invoice" | "receipt") => {
    type === "invoice" ? setInvoiceFile(null) : setReceiptFile(null);
  };

  const handleProcess = () => {
    const formData = new FormData();
  
    if (type) {
      if (invoiceFile) formData.append("files", invoiceFile);
      if (receiptFile) formData.append("files", receiptFile);
    } else {
      if (invoiceFile) formData.append("file", invoiceFile);
      if (receiptFile) formData.append("file", receiptFile);
    }
  
    if (type) {
      formData.append("unit", "675c5721215b85be15fc0bc8");
    }
  
    type
      ? uploadStaffPurchasesDataMutation.mutate(formData)
      : uploadPurchasesDataMutation.mutate(formData);
  };
  

  const isMutating = uploadPurchasesDataMutation.status === "pending";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg max-h-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-black hover:text-gray-700"
        >
          <IoClose className="size-5 text-gray-400" />
        </button>

        <h1 className="text-2xl font-bold text-center mt-6 text-[#495057]">
          {showConfirmation ? "Confirmation" : "Upload Documents"}
        </h1>

        <div className="mt-4 overflow-y-auto max-h-[60vh] px-6 pb-6">
          {showConfirmation ? (
            <div className="text-center mt-8">
              <p className="text-lg mb-6">
                Your details have been submitted successfully!
              </p>
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
            <>
              <div className="mt-5 space-y-7 ">
                {/* {type && (
                  <div className="space-y-2 w-full">
                    <h2 className="pl-1 text-[#091E42] text-sm font-medium">
                      Unit
                    </h2>
                    <SelectInput
                      options={units?.data?.unit.map(
                        (cat: { name: string; _id: string }) => ({
                          label: cat.name,
                          value: cat._id,
                        })
                      )}
                       value={unit}
                       onChange={(selectedOption) => setUnit(selectedOption)}
                    />
                  </div>
                )} */}
                <FileUpload
                  title="Upload Invoice"
                  uploadedFile={null}
                  onFileUpload={(file) => handleFileUpload("invoice", file)}
                  acceptedFileTypes=".jpg, .png, .pdf"
                />
                <FileUpload
                  title="Upload Receipt"
                  uploadedFile={null}
                  onFileUpload={(file) => handleFileUpload("receipt", file)}
                  acceptedFileTypes=".jpg, .png, .pdf"
                />
              </div>

              <div ref={uploadedFileContainerRef}>
                {invoiceFile && (
                  <div className="mt-5">
                    <div className="mb-4 p-6 flex gap-2 w-full items-center justify-center border-2 border-dashed border-[#C9C3C3]">
                      <img src={uploadfileIcon} alt="" className="size-8" />
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-700 break-all">
                            {invoiceFile.name}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {(invoiceFile.size / 1024).toFixed(2)} KB
                        </p>
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
                          <p className="text-sm font-medium text-gray-700 break-all">
                            {receiptFile.name}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {(receiptFile.size / 1024).toFixed(2)} KB
                        </p>
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
              </div>
            </>
          )}
        </div>

        {!showConfirmation && (
          <div className="px-6 pb-6">
            <button
              onClick={handleProcess}
              className={`mt-8 w-full text-white py-2 rounded-lg flex justify-center items-center ${
                !invoiceFile && !receiptFile
                  ? "bg-gray-300 cursor-not-allowed"
                  : "blue-gradient hover:bg-blue-700"
              }`}
              disabled={!invoiceFile && !receiptFile}
            >
              {isMutating ? "Processing..." : "Process"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPurchaseDocumentModal;
