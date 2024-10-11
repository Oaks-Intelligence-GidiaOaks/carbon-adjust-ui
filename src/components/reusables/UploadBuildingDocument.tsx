import { CameraIcon } from 'lucide-react';
import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
  const UploadDocumentsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null; 

  const [commercialFiles, setCommercialFiles] = useState<File[]>([]);
  const [residentialFiles, setResidentialFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'commercial' | 'residential') => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (type === 'commercial') setCommercialFiles(newFiles);
      else setResidentialFiles(newFiles);

      // Mock progress for demonstration
      newFiles.forEach(file => {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const newProgress = prev[file.name] + 10;
            if (newProgress >= 100) clearInterval(interval);
            return { ...prev, [file.name]: newProgress };
          });
        }, 500);
      });
    }
  };

  const removeFile = (fileName: string, type: 'commercial' | 'residential') => {
    if (type === 'commercial') setCommercialFiles(prev => prev.filter(file => file.name !== fileName));
    else setResidentialFiles(prev => prev.filter(file => file.name !== fileName));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-md shadow-lg">
      
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white relative rounded-lg w-[50%] p-6 shadow-lg">
      <button onClick={onClose} className="absolute top-2 right-4 text-black hover:text-gray-700">
        <IoClose className='size-5 text-gray-400' />
      </button>
        <h2 className="text-xl font-semibold text-center mb-4">Upload Documents</h2>
        
        {/* Commercial Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Upload Commercial Information<span className="text-red-500">*</span></label>
          <div className="border-dashed border-2 flex flex-col justify-center items-center border-gray-300 p-6 rounded-md text-center cursor-pointer hover:bg-gray-100">
          <div className='p-3 rounded-full bg-[#ABD7EF]'><FaFileAlt className="text-white w-6 h-6" /></div>
          <input 
              type="file" 
              className="hidden" 
              onChange={(e) => handleFileUpload(e, 'commercial')} 
            />
            <p className="text-sm">Drag and drop files or <span className="text-[#ABD7EF] cursor-pointer">Browse</span></p>
            <p className="text-xs text-[#4C5563]">Support jpg, png, pdf, docx</p>
            <CameraIcon className='text-[#4C5563] size-5 mt-3' />
          </div>

          {commercialFiles.map((file) => (
            <div key={file.name} className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                
                <span className="bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7l6 6-6 6m0 0h18m-18 0L9 7m0 6h18"></path>
                  </svg>
                </span>
                <div>
                  <p className="text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full"
                    style={{ width: `${uploadProgress[file.name] || 0}%` }}
                  ></div>
                </div>
                <button onClick={() => removeFile(file.name, 'commercial')} className="ml-4 text-gray-600 hover:text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Residential Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Upload Residential Information<span className="text-red-500">*</span></label>
          <div className="border-dashed border-2 flex flex-col justify-center items-center border-gray-300 p-6 rounded-md text-center cursor-pointer hover:bg-gray-100">
          <div className='p-3 rounded-full bg-[#ABD7EF]'><FaFileAlt className="text-white w-6 h-6" /></div>
          <input 
              type="file" 
              className="hidden" 
              onChange={(e) => handleFileUpload(e, 'residential')} 
            />
            <p className="text-sm text-[#C9C3C3]">Drag and drop files or <span className="text-[#ABD7EF] cursor-pointer">Browse</span></p>
            <p className="text-xs text-[#4C5563]">Support jpg, png, pdf, docx</p>
            <CameraIcon className='text-[#4C5563] size-5 mt-4' />
          </div>

          {residentialFiles.map((file) => (
            <div key={file.name} className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-600 rounded-full p-2 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7l6 6-6 6m0 0h18m-18 0L9 7m0 6h18"></path>
                  </svg>
                </span>
                <div>
                  <p className="text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full"
                    style={{ width: `${uploadProgress[file.name] || 0}%` }}
                  ></div>
                </div>
                <button onClick={() => removeFile(file.name, 'residential')} className="ml-4 text-gray-600 hover:text-red-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Proceed Button */}
        <button className="w-full py-2 px-4 blue-gradient text-white rounded-md hover:bg-blue-700 transition">Proceed</button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default UploadDocumentsModal;
