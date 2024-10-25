import { PlusCircleIcon, Search } from "lucide-react";
import BuildingHistoryCard from "./BuildingHistoryCard";
import { useState, useRef } from "react";
import UploadDocumentsModal from "@/components/reusables/UploadBuildingDocument";
import { MdFilterList } from "react-icons/md";
import UsageSummary from "./BarChartBuilding";
import TrendingProjections from "./LineChartBuildings";
import { useQuery } from "@tanstack/react-query";
import { getBuildingData } from "@/services/homeOwner";
import Loading from "@/components/reusables/Loading";
import BuildingEmptyState from "@/components/reusables/EmptyStateBuildings";
import RegisterBuilding from "@/components/reusables/RegisterBuilding";
import PaginationButtons from "@/components/reusables/PageButtons";
import CarbonFootPrint from "./GuageChartBuilding";

const BuildingList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState(""); 
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false); 
  const [isRegisterBuildingVisible, setIsRegisterBuildingVisible] = useState(false);
  const [selectedBuildings, setSelectedBuildings] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  // Create a ref for the chart area
  const chartAreaRef = useRef<HTMLDivElement>(null);

  // Fetch building data
  const { data, isLoading, error } = useQuery({
    queryKey: ["building-data"],
    queryFn: getBuildingData,
  });

  const buildingData = data?.data || [];

  if (error) return <div>Error loading buildings data</div>;

  if (isLoading) {
    return (
      <div className="h-32 grid place-items-center">
        <Loading message="loading" />
      </div>
    );
  }

  const handleAddBuilding = () => {
    setIsRegisterBuildingVisible(true);
  };

  if (buildingData.length === 0) {
    return (
      <div className="">
        {isRegisterBuildingVisible ? (
          <RegisterBuilding />
        ) : (
          <BuildingEmptyState onAddBuilding={handleAddBuilding} />
        )}
      </div>
    );
  }

  // Filter buildings based on the search query and date filter
  const filteredBuildingData = buildingData.filter(
    (building: {
      address: { firstLineAddress: string };
      houseType: string;
      serialNumber: string;
      createdAt: string;
    }) => {
      const address = building.address.firstLineAddress.toLowerCase();
      const houseType = building.houseType.toLowerCase();
      const serialNumber = building.serialNumber.toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchesQuery =
        address.includes(query) ||
        houseType.includes(query) ||
        serialNumber.includes(query);

      const matchesDate = filterDate
        ? new Date(building.createdAt).toISOString().slice(0, 10) === filterDate
        : true; // Match the date

      return matchesQuery && matchesDate;
    }
  );

  // Function to toggle selection of buildings
  const handleSelectBuilding = (buildingId: string) => {
    setSelectedBuildings((prev) => {
      const newSelection = prev === buildingId ? '' : buildingId;
      // Scroll to the chart area if a building is selected
      if (newSelection) {
        chartAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      return newSelection;
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredBuildingData.length / itemsPerPage);
  const paginatedData = filteredBuildingData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="py-6">
      {/* Search, Filter, and Upload Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center space-x-4">
          {/* Toggle Date Picker */}
          <div className="relative">
            <button
              className="bg-white text-[#575757] border p-2 rounded-lg flex items-center space-x-2"
              onClick={() => setIsDatePickerVisible((prev) => !prev)}
            >
              <MdFilterList className="w-4 h-4" />
              <span className=" hidden md:block text-sm font-medium text-[#575757]">
                Filter by date
              </span>
            </button>

            {/* Date Picker */}
            {isDatePickerVisible && (
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="absolute border text-sm font-inter p-1.5 shadow-lg w-full"
              />
            )}
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border w-[200px] lg:w-[300px] bg-white text-sm text-[#575757] rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-3 text-[#575757] left-4 size-4" />
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center mt-4 sm:mt-0 w-fit gap-2 blue-gradient text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition"
        >
          <span>Upload Building</span>
          <PlusCircleIcon className="h-5 w-5 ml-2" />
        </button>
      </div>

      {/* Building History or No Data Found */}
      {paginatedData.length > 0 ? (
        paginatedData.map((building: any) => (
          <BuildingHistoryCard
            key={building._id}
            serialNumber={building.serialNumber}
            id={building._id}
            address={building.address.firstLineAddress}
            houseType={building.houseType}
            occupants={building.occupants}
            energySource={building.energySource}
            image={building.file}
            voltageLevel={building.voltageLevel}
            floors={building.numberOfFloors}
            postCode={building.address.postalCode}
            city={building.address.cityOrProvince}
            onSelect={handleSelectBuilding} 
            isSelected={selectedBuildings.includes(building._id)} 
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-4">No data found.</div>
      )}

      {/* Pagination Controls */}
      {filteredBuildingData.length > itemsPerPage && (
        <PaginationButtons 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
          currentPage={currentPage} 
        />
      )}

      {/* Charts */}
      <div ref={chartAreaRef} className="mt-10 bg-white py-9 px-3 md:px-6 md:py-10 shadow-sm">
        <UsageSummary buildingId={selectedBuildings} />
      </div>
      <div className="mt-10 bg-white py-9 px-3 md:px-6 md:py-10 shadow-sm ">
        <TrendingProjections buildingId={selectedBuildings} /> 
      </div>
      <div className="mt-10 bg-white py-9 px-3 md:px-6 md:py-10 shadow-sm ">
        <CarbonFootPrint buildingId={selectedBuildings} /> 
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
