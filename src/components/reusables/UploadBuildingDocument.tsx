import React from "react";
import { IoClose } from "react-icons/io5";
import FileUpload from "./FileUpload";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const handleFileUpload = (file: File) => {
  console.log("File uploaded:", file);
  // Handle file upload logic here (API call, etc.)
};

const UploadDocumentsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 z-50">
    {/* Modal Overlay */}
    <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-black hover:text-gray-700"
      >
        <IoClose className="size-5 text-gray-400" />
      </button>

      {/* Modal Content */}
      <h1 className="text-2xl font-bold text-center">Upload Documents</h1>

      <div className="mt-8">
        <FileUpload
          title="Upload Commercial Information"
          onFileUpload={handleFileUpload}
        />
      </div>

      <div className="mt-8">
        <FileUpload
          title="Upload Residential Information"
          onFileUpload={handleFileUpload}
        />
      </div>

      <button className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Proceed
      </button>
    </div>
    </div>
  );
};

export default UploadDocumentsModal;
