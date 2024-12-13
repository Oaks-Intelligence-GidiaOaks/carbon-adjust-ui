import Search from "@/components/ui/Search";
import DeviceHistoryCard from "./DeviceHistoryCard";
import { useQuery } from "@tanstack/react-query";
import { getDispatchedDevices } from "@/services/homeOwner";
import { IDispatchDevice } from "@/interfaces/device.interface";
import Paginate from "@/components/reusables/Paginate";
import { PaginateProps } from "@/types/general";
import { useEffect, useState } from "react";
import DispatchListSkeleton from "@/components/reusables/device/DispatchListSkeleton";

const DispatchHistory = () => {
  const [pagination, setPagination] = useState<
    Omit<PaginateProps, "onPageChange">
  >({
    currentPage: 1,
    limit: 20,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dispatch-history", pagination.currentPage],
    queryFn: () =>
      getDispatchedDevices(pagination.limit, pagination.currentPage),
  });

  useEffect(() => {
    if (data?.data)
      setPagination({
        currentPage: data?.data.currentPage,
        hasNextPage: data?.data.hasNextPage,
        hasPrevPage: data?.data.hasPrevPage,
        limit: data?.data.limit,
        totalPages: data?.data.totalPages,
      });
  }, [data?.data]);

  const handlePageChange = (pgNo: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: pgNo,
    }));

    refetch();
  };

  if (isLoading) {
    return <DispatchListSkeleton />;
  }

  return (
    <div>
      <div className="flex-center w-full">
        <h2 className="font-[500] text-lg ">Device History</h2>
        <Search className="ml-auto" />
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {Array.from(
          data?.data?.dispatchDevices as IDispatchDevice[],
          (item) => (
            <DeviceHistoryCard key={item._id} {...item} />
          )
        )}
      </div>

      {data?.data?.dispatchDevices.length > 0 && (
        <div className="mt-8 pr-12 w-fit mx-auto">
          <Paginate {...pagination} onPageChange={handlePageChange} />
        </div>
      )}

      {data?.data?.dispatchDevices.length === 0 && (
        <div className="flex justify-center items-center w-full h-fit lg:h-[500px]">
          <div className="capitalize font-medium text-lg">
            no dispatch history data found
          </div>
        </div>
      )}
    </div>
  );
};

export default DispatchHistory;
