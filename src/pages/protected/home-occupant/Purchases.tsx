import PurchasesEmptyState from "@/components/containers/purchases/emptyState";
import PurchaseHistoryCard from "@/components/containers/purchases/purchaseHistoryCard";
import UploadPurchaseDocumentModal from "@/components/dialogs/PurchaseDoc";
import { getPurchasesData } from "@/services/homeOwner";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Paginate from "@/components/reusables/Paginate";
import { PaginateProps } from "@/types/general";
import { useQuery } from "@tanstack/react-query";
import { PlusCircleIcon, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MdFilterList } from "react-icons/md";
import UsageSummary from "@/components/containers/purchases/BarChartPurchases";
import DoughnutUsageSummary from "@/components/containers/purchases/PieChartPurchases";




const PurchaseList = () => {
 
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<string[]>([]);
  const [pagination, setPagination] = useState<
    Omit<PaginateProps, "onPageChange">
  >({
    currentPage: 1,
    limit: 20,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });

   // Create a ref for the chart area
   const chartAreaRef = useRef<HTMLDivElement>(null);

  // Fetch purchases data
  const { data: purchases, isLoading, error } = useQuery({
    queryKey: ["purchases-data", pagination.currentPage],
    queryFn: () => getPurchasesData(pagination.limit, pagination.currentPage), 
  })
 

  const purchasesData = purchases?.data?.purchases || [];
 


  useEffect(() => {
    if (purchases)
      setPagination({
        currentPage: purchases?.data?.page,
        hasNextPage: purchases?.data?.hasNextPage,
        hasPrevPage: purchases?.data?.hasPrevPage,
        limit: purchases?.data?.limit,
        totalPages: purchases?.data?.totalPages,
      });
  }, [purchases]);

  const handlePageChange = (pgNo: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: pgNo,
    }));
  };


  if (error) return <div>Error loading buildings data</div>;

  if (isLoading) {
    return (
      <div className="w-[100%] mx-auto mt-10 flex flex-col gap-4 ">
        {Array.from({ length: 3 }, (_, i) => (
        <Box key={i} sx={{ width: "100%" }}>
          <Skeleton variant="rectangular" width={"100%"} height={100} />
          <Skeleton width={"100%"} />
          <Skeleton width={"50%"} animation="wave" />
        </Box>
      ))}
      </div>
    );
  }


   // Function to toggle selection of buildings
   const handleSelectPurchase = (purchaseId: string) => {
    setSelectedPurchase((prev) => {
      let newSelection;
      if (prev.includes(purchaseId)) {
        // Remove the building if it's already selected
        newSelection = prev.filter(id => id !== purchaseId);
      } else {
        // Add the building if it's not already selected
        newSelection = [...prev, purchaseId];
      }
      
      // Scroll to the chart area if any building is selected
      if (newSelection.length > 0) {
        chartAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      
      return newSelection;
    });
  };
  
  return (
    <div className="py-6">
      <div>
      {/* Search, Filter, and Upload Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-6">
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
          <span>Upload Documents</span>
          <PlusCircleIcon className="h-5 w-5 ml-2" />
        </button>
      </div>

      {purchasesData.length > 0 ? (
        purchasesData.map((purchase:any) => (
          <div className=" lg:w-full mx-auto mt-[10px] space-y-[38px]">
            <PurchaseHistoryCard
              key={purchase._id}
              {...purchase}
              onSelect={handleSelectPurchase}
              isSelected={selectedPurchase.includes(purchase._id)}
            />
          </div>
        ))
      ) : (
        <PurchasesEmptyState />
      )}

       {/* Pagination */}
       {purchasesData && (
        <div className="mt-8 pr-12 w-fit mx-auto ">
          <Paginate {...pagination} onPageChange={handlePageChange} />
        </div>
      )}

       {/* Charts */}
       <div ref={chartAreaRef} className="mt-10 bg-white py-14 px-3 md:px-6 md:py-20 shadow-sm">
        <UsageSummary purchaseId={selectedPurchase} />
      </div>
      {/* <div className="mt-10 bg-white py-14 px-3 md:px-6 md:py-20 shadow-sm ">
        <PieUsageSummary purchaseId={selectedPurchase}/> 
      </div> */}
      <div className="mt-10 bg-white py-14 px-3 md:px-6 md:py-20 shadow-sm ">
        <DoughnutUsageSummary purchaseId={selectedPurchase}/> 
      </div>

      {/* Modal */}
      {isModalOpen && (
        <UploadPurchaseDocumentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
       </div>
    </div>
  );
};

export default PurchaseList;
