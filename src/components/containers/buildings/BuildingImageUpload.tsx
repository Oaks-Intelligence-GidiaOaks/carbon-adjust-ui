import { IoClose } from "react-icons/io5";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadBuildingImage } from "@/services/homeOwner";
import uploadfileIcon from "@/assets/icons/upload-file.svg";
import { FaTrashCan } from "react-icons/fa6";
import FileUpload from "@/components/reusables/FileUpload";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildingId: string;
}

const UploadBuildingImageModal: React.FC<ModalProps> = ({ isOpen, onClose, buildingId }) => {
  const [buildingImage, setBuildingImage] = useState<File | null>(null); 
  const queryClient = useQueryClient();

  const uploadBuildingImageMutation = useMutation({
    mutationKey: ["uploadBuildingImage"],
    mutationFn: (formData: FormData) => uploadBuildingImage(buildingId, formData),
    onSuccess: () => {
      toast.success("Building image uploaded successfully.");
      queryClient.invalidateQueries({ queryKey: ["upload-building-image"] });
      onClose(); 
    },
    onError: () => {
      toast.error("Error uploading building image.");
    },
  });

  const handleSubmit = () => {
    if (buildingImage) {
      const formData = new FormData();
      formData.append("file", buildingImage);

      uploadBuildingImageMutation.mutate(formData, {
        onError: (error) => {
          console.error("Upload error:", error);
        },
      });
    }
  };

  const isMutating = uploadBuildingImageMutation.status === "pending";

  const handleFileUpload = (file: File | File[] | null) => {
    if (file && !Array.isArray(file)) {
      setBuildingImage(file); 
    }
  };

  const handleFileRemove = () => {
    setBuildingImage(null); 
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
          Upload Building Image
        </h1>

        {/* Scrollable File Upload Section */}
        <div className="mt-4 overflow-y-auto max-h-[60vh] px-6 pb-6">
          <div className="mt-5">
            <FileUpload
              title="Upload Building Image"
              uploadedFile={null}
              onFileUpload={handleFileUpload}
              acceptedFileTypes=".jpg, .png, .jpeg"
            />
          </div>

          {/* Display Uploaded File */}
          {buildingImage && (
            <div className="mt-5">
              <div className="mb-4 p-6 flex gap-2 w-full items-center justify-center border-2 border-dashed border-[#C9C3C3]">
                <img src={uploadfileIcon} alt="" className="size-8" />
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700 break-all">{buildingImage.name}</p>
                  </div>
                  <p className="text-xs text-gray-500">{(buildingImage.size / 1024).toFixed(2)} KB</p>
                  <div className="flex gap-2 items-center justify-center">
                    <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
                      <div className="bg-[#139EEC] h-2 rounded-lg w-full"></div>
                    </div>
                    <button
                      onClick={handleFileRemove}
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

        {/* Submit Button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleSubmit}
            className={`mt-8 w-full text-white py-2 rounded-lg flex justify-center items-center ${
              !buildingImage || isMutating
                ? "bg-gray-300 cursor-not-allowed"
                : "blue-gradient hover:bg-blue-700"
            }`}
            disabled={!buildingImage || isMutating}
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

export default UploadBuildingImageModal;
