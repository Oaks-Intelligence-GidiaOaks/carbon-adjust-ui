import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEnergyBill, getEnergyBills } from "@/services/homeOwner";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { formatDate } from "@/lib/utils";

// Energy Bill Interface
interface EnergyBill {
  _id: number;
  name: string;
  uploadedDate: string;
  url: string;
  date: string;
}

// Main Modal Component
interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  buildingId: string;
}

const EnergyBillsModal = ({ isOpen, closeModal, buildingId }: ModalProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [billToDelete, setBillToDelete] = useState<number | null>(null);
  const [billToView, setBillToView] = useState<EnergyBill | null>(null);

  const queryClient = useQueryClient();

  // Fetch data using useQuery
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["building-energy-bills", buildingId],
    queryFn: () => getEnergyBills(buildingId),
    enabled: !!buildingId,
  });

  const energyBills = response?.data || [];

 

  const deleteBillMutation = useMutation({
    mutationFn: (energyBillsId: number) =>
      deleteEnergyBill(buildingId, energyBillsId.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["building-data"] });
      toast.success("Energy bill deleted successfully!", { duration: 5000 });
    },
  });

  // Handle Delete
  const handleDeleteBill = (id: number) => {
    setBillToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (billToDelete !== null) {
      try {
        await deleteBillMutation.mutateAsync(billToDelete);
        setBillToDelete(null);
      } catch (error) {
        toast.error("Failed to delete the bill");
      }
    }
    setIsConfirmOpen(false);
  };

  const isMutating = deleteBillMutation.isPending;

  if (!isOpen) return null;

  // Helper function to extract file name from URL
  const getFileName = (url: string, index: number) => {
    const fileName = url.split("/").pop() || `file-${index + 1}`;
    return `Bill ${index + 1} - ${fileName}`;
  };

  return (
    <>
      <div className="fixed inset-0 flex bg-slate-500 bg-opacity-50 z-50 items-center justify-center">
        <div className="bg-white rounded-md shadow-lg w-full max-w-3xl h-[80vh] p-6">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-lg font-semibold">Energy Bills</h2>
            <button onClick={closeModal} className="text-gray-500">
              <AiOutlineClose size={20} />
            </button>
          </div>

          <div className="mt-4 max-h-72 overflow-y-auto">
            {isLoading ? (
              <p>Loading energy bills...</p>
            ) : error ? (
              <p className="text-red-500">
                Failed to load energy bills. Please try again.
              </p>
            ) : Array.isArray(energyBills) && energyBills.length === 0 ? (
              <p className="text-gray-600 text-sm">No energy bills uploaded.</p>
            ) : Array.isArray(energyBills) ? (
              <ul className="space-y-4">
                {energyBills.map((bill: EnergyBill, index: number) => (
                  <li
                    key={bill._id}
                    className="flex justify-between items-center border p-3 rounded-md"
                  >
                    <div>
                      <p className="text-sm font-medium break-all">
                        {getFileName(bill.url, index)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Uploaded on:{" "}
                        {bill?.date
                          ? formatDate(bill.date)
                          : "Nill"}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setBillToView(bill)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteBill(bill._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-500">Unexpected data format received.</p>
            )}
          </div>

          <div className="flex justify-end my-6">
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {isConfirmOpen && (
        <ConfirmationModal
          confirmDelete={confirmDelete}
          cancelDelete={() => setIsConfirmOpen(false)}
          isMutating={isMutating}
        />
      )}

      {billToView && (
        <DocumentViewModal
          bill={billToView}
          closeModal={() => setBillToView(null)}
        />
      )}
    </>
  );
};

// Document View Modal
interface DocumentViewModalProps {
  bill: EnergyBill;
  closeModal: () => void;
}

const DocumentViewModal = ({ bill, closeModal }: DocumentViewModalProps) => {
  return (
    <div className="fixed inset-0 flex bg-slate-500 bg-opacity-50 z-50 items-center justify-center">
      <div className="bg-white rounded-md shadow-lg w-full max-w-3xl h-full lg:h-[80vh] p-6 overflow-hidden">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold break-all">
            {bill._id} - View Document
          </h2>

          <button onClick={closeModal} className="text-gray-500">
            <AiOutlineClose size={20} />
          </button>
        </div>

        <div className="mt-4 w-fit max-w-[400px] h-[300px]  max-h-[300px] overflow-auto relative">
          <iframe
            src={`${bill.url}#toolbar=0`}
            className="w-full h-full object-contain"
            title={`${bill.name} document`}
          />
        </div>

        <div className="flex justify-end my-6">
          <button
            onClick={closeModal}
            className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
interface ConfirmationModalProps {
  confirmDelete: () => void;
  cancelDelete: () => void;
  isMutating: boolean;
}

const ConfirmationModal = ({
  confirmDelete,
  cancelDelete,
  isMutating,
}: ConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 flex bg-slate-500 bg-opacity-50 z-50 items-center justify-center">
      <div className="bg-white rounded-md shadow-lg w-full max-w-sm p-6">
        <h3 className="text-lg font-semibold">Confirm Deletion</h3>
        <p className="mt-2">
          Are you sure you want to delete this energy bill?
        </p>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={cancelDelete}
            className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className={`py-2 px-4 rounded-md flex justify-center items-center ${
              isMutating
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            disabled={isMutating}
          >
            {isMutating ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnergyBillsModal;
