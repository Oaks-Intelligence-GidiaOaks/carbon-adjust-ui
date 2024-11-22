import { CameraIcon } from "lucide-react";
import React from "react";
import uploadfileIcon2 from "@/assets/icons/uploaded-file.svg";

interface FileUploadProps {
  title: string;
  uploadedFile: File | null;
  onFileUpload: (file: File | File[] | null) => void; // Handles both single and multiple files
  acceptedFileTypes: string;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  title,
  onFileUpload,
  acceptedFileTypes,
  multiple = false, 
}) => {
  

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      onFileUpload(multiple ? files : files[0]);
    }
  };

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files!);
    if (files.length) {
      onFileUpload(multiple ? files : files[0]); 
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">
        {title} <span className="text-red-600">*</span>
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
                accept={acceptedFileTypes} 
                onChange={handleBrowse}
                multiple={multiple} 
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">Support {acceptedFileTypes}</p>
          <CameraIcon className="text-[#4C5563] size-5 mt-3" />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
