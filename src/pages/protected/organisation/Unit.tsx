import DepartmentWithStaffCard from "@/components/containers/organisation/DepartmentWithStaffCard";
import Loading from "@/components/reusables/Loading";
import Paginate from "@/components/reusables/Paginate";
import { Button } from "@/components/ui";
import Search from "@/components/ui/Search";
import { DepartmentWithStaffCardProps } from "@/interfaces/organisation.interface";
import {  AllUnitsAndDetails } from "@/services/organisation";
import { PaginateProps } from "@/types/general";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Units = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-admin-units"],
    queryFn: () => AllUnitsAndDetails(),
  });

  const units: Array<DepartmentWithStaffCardProps> = data?.data?.units || [];
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

 useEffect(() => {
    if (data?.data?.pagination)
      setPagination({
        currentPage: data?.data?.pagination.page,
        hasNextPage: data?.data?.pagination.hasNextPage,
        hasPrevPage: data?.data?.pagination.hasPrevPage,
        limit: data?.data?.pagination.limit,
        totalPages: data?.data?.pagination.totalPages,
      });
  }, [data?.data?.pagination]);

  const handlePageChange = (pgNo: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: pgNo,
    }));
  };

  if (isLoading) {
    return (
      <div className="h-32 pt-10">
        <Loading message="" />
      </div>
    );
  }

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

        <Link to="/organisation/units/new" className="w-fit ml-auto">
          <Button className="gap-3 rounded-[24px]">
            <span>Create Unit</span>
            <PlusCircle />
          </Button>
        </Link>
      </div>

      {/* container for cards */}
      <div className="space-y-6">
        {units.length ? (
          Array.from(units, (it, i) => (
            <DepartmentWithStaffCard key={i} {...it} climateScore={4} />
          ))
        ) : (
          <div className="text-center p-8 ">No units Added</div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 pr-12 w-fit mx-auto">
        <Paginate {...pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Units;
