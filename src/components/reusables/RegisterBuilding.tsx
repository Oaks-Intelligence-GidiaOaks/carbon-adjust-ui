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
      downloadLink: "/residential_building_data_sample.xlsx",
    },
    {
      name: "Commercial Building",
      format: "xls",
      downloadLink: "/commercial_building_data_sample.xlsx",
    },
  ];

  return (
    <div className="max-w-4xl p-4 sm:p-2 mt-6 sm:mt-10">
      {/* Header */}
      <div className="flex flex-col xs:flex-row justify-between sm:items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Register Building
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center w-fit gap-2 blue-gradient text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-blue-700 transition mt-4 xs:mt-0"
        >
          <span>Upload Building</span>
          <PlusCircleIcon className="h-5 w-5 ml-1 sm:ml-2" />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
        Lorem ipsum dolor sit amet consectetur. Feugiat sollicitudin urna sed
        fermentum pulvinar habitant sagittis. Arcu id et nam tortor. Neque eu
        magna ultrices sed ut urna vitae nec vitae. Mi placerat lorem lorem et.
      </p>

      {/* File List */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-gray-500 mt-6 sm:mt-10 text-sm sm:text-base">
        <span className="font-medium">File name</span>
        <span className="text-right mr-12 sm:mr-32 hidden lg:block font-medium">File format</span>
      </div>
      {files.map((file, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-300 py-4 text-sm sm:text-base"
        >
          {/* Left Section: File Icon and File Name */}
          <div className="flex items-center mb-2 sm:mb-0">
            <FaFileAlt className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6 mr-3" />
            <span className="font-medium text-gray-800">{file.name}</span>
          </div>

          {/* Right Section: File Format and Download Button */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <span className="mr-4 sm:mr-6  text-gray-500">.{file.format}</span>
            <a
              href={file.downloadLink}
              download
              className="flex items-center gap-2 justify-center px-3 sm:px-4 py-2 border border-[#139EEC] text-[#139EEC] font-semibold rounded-md hover:bg-[#139EEC] hover:text-white transition-colors"
            >
              Download <GoDownload size={16}  />
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
