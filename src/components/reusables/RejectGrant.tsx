import React, { useState } from 'react';
import toast from "react-hot-toast";
import { Trash2Icon } from 'lucide-react';
import { useMutation } from "@tanstack/react-query";
import { rejectGrant } from "@/services/homeOwner"; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
}

const RejectGrantModal: React.FC<ModalProps> = ({ isOpen, onClose, applicationId }) => {
  const [isLoading, setIsLoading] = useState(false); 


  const { mutate: handleReject } = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return rejectGrant(applicationId);
    },
    onSuccess: () => {
      toast.error('Grant rejected successfully');
      onClose(); 
      setIsLoading(false); 
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred while rejecting the grant");
      setIsLoading(false);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
        <Trash2Icon className="w-12 h-12 text-[#FF3E3E] rounded-full mb-4 mx-auto p-2 bg-[#FFE6EF]" />
        <h2 className="text-xl font-semibold mb-4 font-poppins text-[#333333]">Reject Grant?</h2>
        <p className="text-[#575757] font-poppins mb-6">Are you sure you want to reject this grant request?</p>
        <div className="flex w-full space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 w-full border text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => handleReject()}
            disabled={isLoading}
            className={`px-4 py-2 w-full bg-red-600 text-white rounded-lg ${isLoading ? 'cursor-not-allowed' : 'hover:bg-red-700'}`}
          >
            {isLoading ? "Processing..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectGrantModal;
