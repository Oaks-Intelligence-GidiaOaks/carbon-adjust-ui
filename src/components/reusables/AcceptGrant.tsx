import { CheckCircleIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useMutation} from "@tanstack/react-query";
import { acceptGrant } from '@/services/homeOwner';



interface AcceptGrantProps {
  isOpen: boolean;
  applicationId: string;
  onClose: () => void;
}

const AcceptGrantModal: React.FC<AcceptGrantProps> = ({ isOpen, applicationId, onClose }) => {
  if (!isOpen) return null;
 

  const [isLoading, setisLoading] = useState(false); 
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { mutate: handleAccept } = useMutation({
    mutationFn: () => acceptGrant(applicationId),
    mutationKey: ['accept-grant', applicationId], 
    onError: (error: any) => {
      toast.error(error?.message || 'Something went wrong');
    },
    onSuccess: () => {
      // Invalidate queries if needed to update data
    //   queryClient.invalidateQueries(['get-user-grants']);
      setisLoading(true);
      toast.success('Grant offer accepted successfully');
      setIsConfirmed(true); // Mark the grant as accepted
    },
  });


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
        {isConfirmed ? (
          <>
            <CheckCircleIcon  className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Grant Accepted</h2>
            <p className="text-gray-600 mb-6">
              You have successfully accepted this grant approval. Click on proceed to marketplace to transact with the accepted grant.
            </p>
            <button
              onClick={onClose}
              className="px-10 py-2 blue-gradient text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Accept Grant?</h2>
            <p className="text-gray-600 mb-6 text-center px-4">Are you sure you want to accept this grant approval?</p>
            <div className="flex w-full space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 w-full bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            <button
            onClick={() => handleAccept()}
            disabled={isLoading}
            className={`px-4 py-2 w-full blue-gradient text-white rounded-lg ${isLoading ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? "Processing..." : "Accept"}
          </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptGrantModal;
