import { CameraIcon } from "lucide-react";
import React, { useState } from "react";
import uploadfileIcon2 from "@/assets/icons/uploaded-file.svg";

interface FileUploadProps {
  title: string;
  uploadedFile: File | null;
  onFileUpload: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ title, onFileUpload }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileUpload(file);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000); // Simulate file upload
    }
  };

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      onFileUpload(file);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000); // Simulate file upload
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">
        {title}*
      </label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 cursor-pointer"
      >
        <img src={uploadfileIcon2} alt="" className="size-12" />
        <div className="space-y-1 flex flex-col text-center items-center">
          <div className="flex text-sm text-gray-600">
            <p className="pl-1">Drag and drop or </p>
            <label
              htmlFor={`file-upload-${title}`}
              className="relative cursor-pointer ml-2 bg-white rounded-md font-medium text-[#139EEC] underline focus-within:outline-none"
            >
              <span> Browse</span>
              <input
                id={`file-upload-${title}`}
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleBrowse}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">Support jpg, png, pdf, docx</p>
          <CameraIcon className="text-[#4C5563] size-5 mt-3" />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
