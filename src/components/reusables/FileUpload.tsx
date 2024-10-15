import { CameraIcon } from "lucide-react";
import React, { useState } from "react";

interface FileUploadProps {
  title: string;
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ title, onFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      onFileUpload(file);
      setIsLoading(true);
      // Simulate loading state
      setTimeout(() => setIsLoading(false), 2000); // Simulate file upload
    }
  };

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      setUploadedFile(file);
      onFileUpload(file);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000); // Simulate file upload
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{title}*</label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mt-1 flex justify-center border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 cursor-pointer"
      >
        <div className="space-y-1 flex flex-col text-center items-center">
          <div className="flex text-sm text-gray-600">
          <p className="pl-1">Drag and drop or </p>
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-[#ABD7EF] focus-within:outline-none"
            >  
              <span>Browse</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleBrowse}
              />
            </label>
          
          </div>
          <p className="text-xs text-gray-500">Support jpg, png, pdf, docx</p>
          <CameraIcon className='text-[#4C5563] size-5 mt-3' />
        </div>
      </div>

      {uploadedFile && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              {uploadedFile.name}
            </p>
            <button
              onClick={() => setUploadedFile(null)}
              className="text-red-600 hover:text-red-800"
            >
              🗑️
            </button>
          </div>
          <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
          <div className="w-full bg-gray-200 h-2 rounded-lg mt-2">
            <div
              className={`bg-blue-500 h-2 rounded-lg transition-all duration-500 ease-in-out ${isLoading ? "w-3/4" : "w-full"}`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
