import { PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import UploadDocumentsModal from "./UploadBuildingDocument"; 

const RegisterBuilding: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const files = [
    {
      name: "Residential Building",
      format: "xls",
      downloadLink: "#", 
    },
    {
      name: "Commercial Building",
      format: "xls",
      downloadLink: "#", 
    },
  ];

  return (
    <div className="max-w-4xl p-6 mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Register Building</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 blue-gradient text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition"
        >
          <span>Upload Building</span>
          <PlusCircleIcon className="h-5 w-5 ml-2" />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-500 mb-8">
        Lorem ipsum dolor sit amet consectetur. Feugiat sollicitudin urna sed
        fermentum pulvinar habitant sagittis. Arcu id et nam tortor. Neque eu
        magna ultrices sed ut urna vitae nec vitae. Mi placerat lorem lorem et.
      </p>

      {/* File List */}
      <div className="grid grid-cols-2 gap-4 text-gray-500 mt-10">
        <span className="text-sm font-medium">File name</span>
        <span className="text-sm font-medium text-right mr-32">File format</span>
      </div>
      {files.map((file, index) => (
        <div
          key={index} // Move key here
          className="flex items-center justify-between border-b border-gray-300 py-4"
        >
          {/* Left Section: File Icon and File Name */}
          <div className="flex items-center">
            <FaFileAlt className="text-gray-500 w-6 h-6 mr-3" />
            <span className="text-lg font-medium text-gray-800">
              {file.name}
            </span>
          </div>

          {/* Right Section: File Format and Download Button */}
          <div className="flex items-center">
            <span className="mr-6 text-gray-500">.{file.format}</span>
            <a
              href={file.downloadLink}
              download
              className="flex items-center gap-3 justify-center px-4 py-2 border border-[#139EEC] text-[#139EEC] font-semibold rounded-md hover:bg-[#139EEC] hover:text-white transition-colors"
            >
              Download <GoDownload size={18} />
            </a>
          </div>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && (
        <UploadDocumentsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default RegisterBuilding;
