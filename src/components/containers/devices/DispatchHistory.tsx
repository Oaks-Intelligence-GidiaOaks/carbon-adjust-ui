import Search from "@/components/ui/Search";
import DeviceHistoryCard from "./DeviceHistoryCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/reusables/Loading";
import { getDispatchedDevices } from "@/services/homeOwner";
import { IDispatchDevice } from "@/interfaces/device.interface";
import Paginate from "@/components/reusables/Paginate";
import { PaginateProps } from "@/types/general";
import { useEffect, useState } from "react";

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
    queryKey: ["dispatch-devices"],
    queryFn: () => getDispatchedDevices(),
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
    return (
      <div className="">
        <Loading message="Loading.." />
      </div>
    );
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

      <div className="mt-8 pr-12 w-fit mx-auto">
        <Paginate {...pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default DispatchHistory;
