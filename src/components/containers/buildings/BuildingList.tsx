import { PlusCircleIcon, Search } from "lucide-react";
import BuildingHistoryCard from "./BuildingHistoryCard";
import { useState } from "react";
import UploadDocumentsModal from "@/components/reusables/UploadBuildingDocument";
import { MdFilterList } from "react-icons/md";
import UsageSummary from "./BarChartBuilding";
import TrendingProjections from "./LineChartBuildings";
import { useQuery } from "@tanstack/react-query";
import { getBuildingData } from "@/services/homeOwner";


const BuildingList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch building data
   const { data, isLoading, error } = useQuery({
    queryKey: ["building-data"],
    queryFn: getBuildingData,
  });

  // Check if response.data is an array
  const buildingData = data.data;

  // Log the data for debugging
  console.log("Fetched Building Data:", data);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading building data: {error.message}</div>;

  return (
    <div className="p-6">
      {/* Search, Filter, and Upload Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button className="bg-white text-[#575757] border p-2 rounded-lg flex items-center space-x-2">
            <MdFilterList className="w-4 h-4" />
            <span className="text-sm font-medium">Filter by date</span>
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              className="border bg-white text-sm text-[#575757] rounded-lg py-1.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-2 text-[#575757] left-4 size-4" />
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 blue-gradient text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition"
        >
          <span>Upload Building</span>
          <PlusCircleIcon className="h-5 w-5 ml-2" />
        </button>
      </div>

      {/* Building History */}
      {buildingData.map((building: { id: any; }) => (
        <BuildingHistoryCard key={building.id} {...building} />
      ))}


      {/* charts */}
      <div className="mt-10">
        <UsageSummary  /> {/* Pass data to UsageSummary */}
      </div>
      <div className="mt-10">
        <TrendingProjections /> {/* Pass data to TrendingProjections */}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <UploadDocumentsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BuildingList;
