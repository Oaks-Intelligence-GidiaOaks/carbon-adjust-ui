import Paginate from "@/components/reusables/Paginate";
import { Button } from "@/components/ui";
import Search from "@/components/ui/Search";
import { PaginateProps } from "@/types/general";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import staffMembers from "@/dummy/staff-members.json";
import { useState } from "react";
import StaffListWithDepartment from "@/components/containers/organisation/StaffListWithDepartment";

const OrganisationStaff = () => {
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
    <div className="">
      <div className="my-10">
        <h2 className="font-[600] font-dm-sans text-3xl text-[#495057]">
          Units
        </h2>
      </div>

      {/* filter search and button */}
      <div className="flex-center gap-4 my-10">
        {/* filter */}

        <Search />

        <Link to="/organisation/staff/new" className="w-fit ml-auto">
          <Button className="gap-3 rounded-[24px]">
            <span>Add Staff</span>
            <PlusCircle />
          </Button>
        </Link>
      </div>

      {/* container for cards */}
      <div className="space-y-10">
        {Array.from({ length: 5 }, (_, i) => (
          <StaffListWithDepartment
            unitName="Design Department"
            staffList={staffMembers}
            key={i}
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

export default OrganisationStaff;
