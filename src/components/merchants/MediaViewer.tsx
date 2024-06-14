// import { EyeIcon } from "@heroicons/react/24/outline";
import React from "react";
import { BiDownload } from "react-icons/bi";
import { FiFile } from "react-icons/fi"; // Importing Feather Icons for file icon
// import { HiEye } from "react-icons/hi2";
import { MdOutlineOpenInNew } from "react-icons/md";

type MediaViewerProps = {
  media: string[];
};

const MediaViewer: React.FC<MediaViewerProps> = ({ media }) => {
  // Function to handle download
  const handleDownload = (url: string) => {
    // Creating a temporary anchor element
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.setAttribute("download", ""); // Adding attribute to force download
    document.body.appendChild(downloadLink);
    downloadLink.click(); // Simulating click on anchor element
    document.body.removeChild(downloadLink); // Removing temporary anchor element
  };

  // Function to open document in new tab
  const openDocumentInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      {media.map((item, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow-sm bg-white cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center">
            <FiFile className="text-gray-600 mr-2 size-14" />
            <div>
              <p className="text-lg font-semibold mb-2">Document Preview</p>
              <p className="text-sm text-gray-500">{item.split("/").pop()}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              title="Open"
              className="px-2 py-2 text-black-main rounded-lg hover:bg-gray-200 focus:outline-none"
              onClick={() => openDocumentInNewTab(item)}
            >
              <MdOutlineOpenInNew className="size-6" />
            </button>
            <button
              title="Download"
              className="px-2 py-2 text-black-main rounded-lg hover:bg-gray-200 focus:outline-none"
              onClick={() => handleDownload(item)}
            >
              <BiDownload className="size-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaViewer;
