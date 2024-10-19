import { IoClose } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";
import FileUpload from "./FileUpload";
import { uploadBuildingData } from "@/services/homeOwner";
import { FaSpinner } from "react-icons/fa"; // Add spinner icon
import { useMutation} from "@tanstack/react-query";
import uploadfileIcon from "@/assets/icons/upload-file.svg";
import { FaTrashCan } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadDocumentsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [commercialFile, setCommercialFile] = useState<File | null>(null);
  const [residentialFile, setResidentialFile] = useState<File | null>(null);

  // const queryClient = useQueryClient(); // Initialize queryClient to invalidate queries

  // Mutation to upload building data
  const uploadBuildingDataMutation = useMutation({
    mutationKey: ["uploadBuildingData"],
    mutationFn: (formData: FormData) => uploadBuildingData(formData),
    onSuccess: () => {
      toast.success("Building data uploaded successfully.");
      onClose(); 
    },
    onError: (err: any) => {
      toast.error(`Error uploading building data: ${err.message || "Unknown error"}`);
    },
    onSettled: () => {
      // Invalidate queries after the mutation has settled (success or error)
      // queryClient.invalidateQueries({ queryKey: const const [activeTab] });
    },
  });

  const handleSubmit = () => {
    if (commercialFile || residentialFile) {
      const formData = new FormData();
      if (commercialFile) formData.append("file", commercialFile);
      if (residentialFile) formData.append("file", residentialFile);

      uploadBuildingDataMutation.mutate(formData, {
        onError: (error) => {
          console.error("Upload error:", error);
        },
      });
    }
  };

  // Get mutation status and check if it's loading
  const isMutating = uploadBuildingDataMutation.status === "pending";

  // Function to rename the file
  const renameFile = (file: File, newName: string): File => {
    return new File([file], newName, { type: file.type });
  };

  const handleCommercialFileUpload = (file: File | File[] | null) => {
    if (file && !Array.isArray(file)) {
      const renamedFile = renameFile(file, "Commercial Building -.xls");
      setCommercialFile(renamedFile);
    }
  };

  const handleResidentialFileUpload = (file: File | File[] | null) => {
    if (file && !Array.isArray(file)) {
      const renamedFile = renameFile(file, "Residential Building -.xls");
      setResidentialFile(renamedFile);
    }
  };

  if (!isOpen) return null;

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
          Upload Documents
        </h1>

        {/* Scrollable File Upload Section */}
        <div className="mt-4 overflow-y-auto max-h-[60vh] px-6 pb-6">
          <div className="mt-5">
            <FileUpload
              title="Upload Commercial Information"
              uploadedFile={commercialFile}
              onFileUpload={handleCommercialFileUpload}
              acceptedFileTypes=".xls, .xlsx, .csv"
            />
          </div>

          <div className="mt-5">
            <FileUpload
              title="Upload Residential Information"
              uploadedFile={residentialFile}
              onFileUpload={handleResidentialFileUpload}
              acceptedFileTypes=".xls, .xlsx, .csv"
            />
          </div>
          <div className="mt-5">
            {commercialFile && (
              <div className="mb-4 p-6 flex gap-2 w-full items-center justify-center border-2 border-dashed border-[#C9C3C3]">
                <img src={uploadfileIcon} alt="" className="size-8" />
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">
                      {commercialFile.name}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {(commercialFile.size / 1024).toFixed(2)} KB
                  </p>
                  <div className="flex gap-2 items-center justify-center">
                    <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                      <div className="bg-[#139EEC] h-2 rounded-lg w-full"></div>
                    </div>
                    <button
                      onClick={() => setCommercialFile(null)}
                      className="text-[#A1A4B1] hover:text-red-600"
                    >
                      <FaTrashCan className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {residentialFile && (
              <div className="p-6 border-2 flex gap-2 items-center justify-center w-full border-dashed border-[#C9C3C3]">
                <img src={uploadfileIcon} alt="" className="size-8" />
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">
                      {residentialFile.name}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {(residentialFile.size / 1024).toFixed(2)} KB
                  </p>
                  <div className="flex gap-2 items-center justify-center">
                    <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                      <div className="bg-[#139EEC] h-2 rounded-lg w-full"></div>
                    </div>
                    <button
                      onClick={() => setResidentialFile(null)}
                      className="text-[#A1A4B1] hover:text-red-600"
                    >
                      <FaTrashCan className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleSubmit}
            className={`mt-8 w-full text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center ${
              isMutating || (!commercialFile && !residentialFile)
                ? "bg-gray-300 cursor-not-allowed"
                : "blue-gradient text-white hover:bg-blue-700"
            }`}
            disabled={isMutating || (!commercialFile && !residentialFile)}
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

export default UploadDocumentsModal;

