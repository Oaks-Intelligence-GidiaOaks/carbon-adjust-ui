import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { CheckCircle2Icon } from 'lucide-react';
import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';


interface ModalProps {
  isOpen: boolean;
  isConfirmed: boolean; 
  onClose: () => void;
  onAccept: () => void;
}

const AcceptGrantModal: React.FC<ModalProps> = ({ isOpen, isConfirmed, onClose, onAccept }) => {
  if (!isOpen) return null;

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
                onClick={onAccept}
                className="px-4 py-2 w-full blue-gradient text-white rounded-lg hover:bg-blue-700"
              >
                Accept
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptGrantModal;
