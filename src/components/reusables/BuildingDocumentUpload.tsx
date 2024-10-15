import React from "react";
import FileUpload from "./FileUpload";

const FileUploadPage: React.FC = () => {
  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file);
    // Handle file upload logic here (API call, etc.)
  };

  return (
    <div className="max-w-lg mx-auto p-4">
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
  );
};

export default FileUploadPage;
