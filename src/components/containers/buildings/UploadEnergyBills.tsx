import { IoClose } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";
import FileUpload from "../../reusables/FileUpload";
import { FaSpinner } from "react-icons/fa"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadEnergyBills } from "@/services/homeOwner";
import uploadfileIcon from "@/assets/icons/upload-file.svg";
import { FaTrashCan } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildingId: string;
}

const UploadEnergyBillsModal: React.FC<ModalProps> = ({ isOpen, onClose, buildingId }) => {
  const [energyBills, setEnergyBills] = useState<File[]>([]);
  const queryClient = useQueryClient();

  // Mutation to upload energy bills
  const uploadEnergyBillsMutation = useMutation({
    mutationKey: ["uploadEnergyBills"],
    mutationFn: (formData: FormData) => uploadEnergyBills(buildingId, formData),
    onSuccess: () => {
      toast.success("Energy bills uploaded successfully.");
      queryClient.invalidateQueries({ queryKey: ["b"] });
      onClose(); 
    },
    onError: () => {
      toast.error("Error uploading energy bills.");
    },
  });

  const handleSubmit = () => {
    if (energyBills.length > 0) {
      const formData = new FormData();
      energyBills.forEach((bill) => formData.append("file", bill));

      uploadEnergyBillsMutation.mutate(formData, {
        onError: (error) => {
          console.error("Upload error:", error);
        },
      });
    }
  };

  const handleFileUpload = (files: File | File[] | null) => {
    if (files) {
      if (Array.isArray(files)) {
        // If multiple files are uploaded, spread the array into state
        setEnergyBills((prevFiles) => [...prevFiles, ...files]);
      } else {
        // If a single file is uploaded
        setEnergyBills((prevFiles) => [...prevFiles, files]);
      }
    }
  };

  const handleFileRemove = (fileName: string) => {
    setEnergyBills((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  if (!isOpen) return null;

  const isMutating = uploadEnergyBillsMutation.status === "pending";
  const isDisabled = energyBills.length === 0 || isMutating;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg max-h-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-black hover:text-gray-700"
        >
          <IoClose className="size-5 text-gray-400" />
        </button>

        {/* Modal Title */}
        <h1 className="text-2xl font-bold text-center mt-6 text-[#495057]">
          Upload Energy Bills
        </h1>

        {/* Scrollable File Upload Section */}
        <div className="mt-4 overflow-y-auto max-h-[60vh] px-6 pb-6">
          <div className="mt-5">
            <FileUpload
              title="Upload Energy Bills"
              uploadedFile={null}
              onFileUpload={handleFileUpload}
              acceptedFileTypes=".jpg, .png, .jpeg, .pdf"
              multiple={true}
            />
          </div>

          {/* Display Uploaded Files */}
          {energyBills.length > 0 && (
            <div className="mt-5">
              {energyBills.map((file, index) => (
                <div
                  key={index}
                  className="mb-4 p-6 flex gap-2 w-full items-center justify-center border-2 border-dashed border-[#C9C3C3]"
                >
                  <img src={uploadfileIcon} alt="" className="size-8" />
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700 break-all">
                        {file.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                    <div className="flex gap-2 items-center justify-center">
                      <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                        <div className="bg-[#139EEC] h-2 rounded-lg w-full"></div>
                      </div>
                      <button
                        onClick={() => handleFileRemove(file.name)}
                        className="text-[#A1A4B1] hover:text-red-600"
                      >
                        <FaTrashCan className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleSubmit}
            className={`mt-8 w-full py-2 rounded-lg flex justify-center items-center ${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "blue-gradient text-white hover:bg-blue-700"
            }`}
            disabled={isDisabled}
          >
            {isMutating ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              "Proceed"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadEnergyBillsModal;
