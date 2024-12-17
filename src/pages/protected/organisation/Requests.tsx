import BackButton from "@/components/reusables/BackButton";
import Paginate from "@/components/reusables/Paginate";
import Search from "@/components/ui/Search";
import StaffRequestCard from "@/components/ui/StaffRequestCard";
import { AllUnitsRequests } from "@/services/organisation";
import { PaginateProps } from "@/types/general";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Requests = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-requests"],
    queryFn: () => AllUnitsRequests(),
  });
  console.log(data)
  //const units: Array<DepartmentWithStaffCardProps> = data?.data?.units || [];
  // @ts-ignore
  const [pagination, setPagination] = useState<
    Omit<PaginateProps, "onPageChange">
  >({
    currentPage: 1,
    limit: 20,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });

  const handlePageChange = () => {
    // do nothing for now
  };

  return (
    <div className="frame-container">
      <div className="flex-center gap-x-6">
        <BackButton />
        <h2 className="font-[600] text-2xl">Requests</h2>
      </div>

      {/* filter & Search */}
      <div className="flex-center gap-4 my-10">
        <Search />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 16 }, () => (
          <StaffRequestCard
            name="Todd H. Harrison"
            role="Project Manager"
            department="Marketing Department"
            requestDetails="Has made a request to register buildings and add assets."
            status="Pending"
            profileImage="https://via.placeholder.com/150"
            onApprove={() => alert("Request Approved!")}
            onDecline={() => alert("Request Declined!")}
            onViewDetails={() => alert("Viewing Details...")}
            className="w-full max-w-full"
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 pr-12 w-fit mx-auto">
        <Paginate {...pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Requests;
