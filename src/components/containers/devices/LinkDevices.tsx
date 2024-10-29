import Loading from "@/components/reusables/Loading";
import { getBuildingData, linkDevice } from "@/services/homeOwner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import PaginationButtons from "@/components/reusables/PageButtons";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";

type Building = {
  _id: string;
  address: string;
  houseType: string;
  powerRating: string;
  voltageLevel?: string;
  imageUrl: string;
};

export const LinkDeviceModal: React.FC<{
  onClose: () => void;
  deviceId: any;
}> = ({ onClose, deviceId }) => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );
  const [isConfirming, setIsConfirming] = useState(false);

  const itemsPerPage = 10;

  // Fetch building data
  const { data, isLoading } = useQuery({
    queryKey: ["building-data"],
    queryFn: () => getBuildingData(),
  });

  const buildingData = data?.data || [];
  const totalPages = Math.ceil(buildingData.length / itemsPerPage);
  const paginatedData = buildingData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const linkSelectedDevice = useMutation({
    mutationFn: ({
      buildingId,
      deviceIds,
    }: {
      buildingId: string;
      deviceIds: string[];
    }) => linkDevice(buildingId, deviceIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["building-data"] });
      toast.success("Device linked successfully!", { duration: 5000 });
      onClose(); // Close modal on success
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to link device. Please try again."
      );
    },
  });

  const handleConfirmLink = async () => {
    if (selectedBuilding) {
      const deviceIds = [deviceId];
      await linkSelectedDevice.mutateAsync({
        buildingId: selectedBuilding._id,
        deviceIds,
      });
      setSelectedBuilding(null);
      setIsConfirming(false);
    }
  };

  const handleLinkClick = (building: Building) => {
    setSelectedBuilding(building);
    setIsConfirming(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 z-50">
      <div className="relative bg-white w-full max-w-xl p-6 rounded-lg shadow-lg max-h-[100vh]">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <IoClose className="h-6 w-6" />
        </button>

        {/* Conditional rendering based on isConfirming state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loading message="Loading available buildings..." />
          </div>
        ) : isConfirming && selectedBuilding ? (
          // Confirmation Message
          <div className="text-center">
            <h2 className="text-xl text-center font-semibold mb-4 text-[#333333]">
              Confirm Device Link
            </h2>
            <p className="mb-6 text-center text-[#575757] ">
              Are you sure you want to link this device to{" "}
              {selectedBuilding.houseType}?
            </p>

            <div className="flex w-full gap-4">
              <button
                onClick={() => {
                  setIsConfirming(false);
                  setSelectedBuilding(null);
                }}
                className="px-4 py-2 w-full border text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmLink}
                className={`px-4 py-2 w-full rounded-md flex justify-center items-center ${
                  linkSelectedDevice.isPending
                    ? "bg-gray-300 cursor-not-allowed"
                    : "blue-gradient text-white"
                }`}
                disabled={linkSelectedDevice.isPending}
              >
                {linkSelectedDevice.isPending ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Linking...
                  </>
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </div>
        ) : (
          // List of buildings
          <>
            <h2 className="text-xl font-semibold mb-4">Available Buildings</h2>
            <div className="mt-4 space-y-4 overflow-auto max-h-[70vh]">
              {paginatedData.map((building: any) => (
                <div key={building.id} className="border rounded-lg">
                  <div className="flex justify-between p-3 border-b">
                    <span className="font-poppins text-black-main font-bold">
                      {building.serialNumber}
                    </span>
                    <button className="text-gray-500 hover:text-gray-700">
                      <HiDotsVertical className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="flex flex-col md:flex-row gap-10 mt-5 px-4 py-2">
                    <div className="w-[200px] h-[200px] border bg-gray-300">
                      {building.file ? (
                        <img
                          src={building.file}
                          alt={`Building ${building._id}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 text-sm text-center">
                          Image not available
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-5 mt-4 md:mt-0">
                        <div className="flex flex-wrap gap-10">
                          <div>
                            <h4 className="text-[#767A85] font-inter text-xs">
                              Address
                            </h4>
                            <p className="font-semibold text-xs font-inter text-[#1F2026]">
                              {building.address.firstLineAddress}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-[#767A85] font-inter text-xs">
                              Power rating:
                            </h4>
                            <p className="font-semibold text-xs font-inter text-[#1F2026]">
                              {building.powerRating || "V"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-8">
                          <div>
                            <h4 className="text-[#767A85] font-inter text-xs">
                              Voltage level
                            </h4>
                            <p className="font-semibold text-xs font-inter text-[#1F2026]">
                              {building.voltageLevel} V
                            </p>
                          </div>
                          <div>
                            <h4 className="text-[#767A85] font-inter text-xs">
                              House type:
                            </h4>
                            <p className="font-semibold text-xs font-inter text-[#1F2026]">
                              {building.houseType}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-blue-500 mt-10 text-white px-14 py-2 rounded-full shadow hover:bg-blue-600"
                        onClick={() => handleLinkClick(building)}
                      >
                        Link
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {buildingData.length > itemsPerPage && (
              <PaginationButtons
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
