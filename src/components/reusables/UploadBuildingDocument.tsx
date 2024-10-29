import { IoClose } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";
import FileUpload from "./FileUpload";
import { uploadBuildingData } from "@/services/homeOwner";
import { FaFileAlt, FaSpinner } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import uploadfileIcon from "@/assets/icons/upload-file.svg";
import { FaTrashCan } from "react-icons/fa6";
import { GoDownload } from "react-icons/go";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadDocumentsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [showFileList, setShowFileList] = useState(true);
  const [commercialFile, setCommercialFile] = useState<File | null>(null);
  const [residentialFile, setResidentialFile] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const uploadBuildingDataMutation = useMutation({
    mutationKey: ["uploadBuildingData"],
    mutationFn: (formData: FormData) => uploadBuildingData(formData),
    onSuccess: () => {
      toast.success("Building data uploaded successfully.");
      onClose();
    },
    onError: (err: any) => {
      const errorMessage =
        err.response?.data?.message || "An unknown error occurred";
      const errorType = err.response?.data?.error || "Error";
      toast.error(`${errorType}: ${errorMessage}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["upload-building-document"] });
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

  const isMutating = uploadBuildingDataMutation.status === "pending";

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
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-black hover:text-gray-700"
        >
          <IoClose className="size-5 text-gray-400" />
        </button>
        <h1 className="text-2xl font-bold text-center mt-6 text-[#495057]">
          {showFileList ? "File List" : "Upload Documents"}
        </h1>

        <div className="mt-4  px-6 pb-6">
          {showFileList ? (
            <div>
              {/* File List Content */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4 text-gray-500 mt-6 sm:mt-10 text-sm sm:text-base">
                <span className="font-medium">File name</span>
                <span className="text-right mr-12 sm:mr-32 hidden lg:block font-medium">
                  File format
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  {
                    name: "Residential Building",
                    format: "xls",
                    downloadLink: "/residential_building_data_sample.xlsx",
                  },
                  {
                    name: "Commercial Building",
                    format: "xls",
                    downloadLink: "/commercial_building_data_sample.xlsx",
                  },
                ].map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-300 py-4"
                  >
                    {/* Left Section: File Icon and File Name */}
                    <div className="flex items-center mb-2 sm:mb-0">
                      <FaFileAlt className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                      <span className="font-medium text-gray-800">
                        {file.name}
                      </span>
                    </div>
                    {/* Right Section: File Format and Download Button */}
                    <div className="flex items-center justify-between w-full sm:w-auto">
                      <span className="mr-4 sm:mr-6  text-gray-500">
                        .{file.format}
                      </span>
                      <a
                        href={file.downloadLink}
                        download
                        className="flex items-center gap-2 justify-center px-3 sm:px-4 py-2 border border-[#139EEC] text-[#139EEC] font-semibold rounded-md hover:bg-[#139EEC] hover:text-white transition-colors"
                      >
                        Download <GoDownload size={16} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowFileList(false)}
                className="mt-8 w-full blue-gradient text-white py-2 rounded-lg"
              >
                Proceed
              </button>
            </div>
          ) : (
            <div>
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
                  className={`mt-8 w-full text-white py-2 rounded-lg flex justify-center items-center ${
                    isMutating || (!commercialFile && !residentialFile)
                      ? "bg-gray-300 cursor-not-allowed"
                      : "blue-gradient text-white "
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentsModal;
