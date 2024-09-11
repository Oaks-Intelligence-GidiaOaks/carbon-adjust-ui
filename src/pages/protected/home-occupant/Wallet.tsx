import DeviceHistoryCard from "@/components/containers/devices/DeviceHistoryCard";
import WalletTabs from "@/components/containers/devices/WalletTabs";
import Loading from "@/components/reusables/Loading";
import Paginate from "@/components/reusables/Paginate";
import { IDispatchDevice } from "@/interfaces/device.interface";
import { getDispatchedDevices } from "@/services/homeOwner";
import { PaginateProps } from "@/types/general";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import WalletCard from "@/components/ui/WalletCard";

const Wallet = () => {
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

  return (
    <div className="p-6 bg-[#F9FCFD]">
      <WalletTabs WalletTitle={""} />

      <div>
        <div className="flex-center justify-between mt-10 pb-6 ">
          <h2 className="text-[#333333] font-[600] text-[24px]">
            Transaction History
          </h2>
        </div>

        {isLoading ? (
          <div className="h-32 grid place-items-center">
            <Loading message="loading" />
          </div>
        ) : (
          <div className="space-y-5">
            {Array.from(
              data?.data?.dispatchDevices as IDispatchDevice[],
              (item) => (
                <DeviceHistoryCard key={item._id} {...item} />
              )
            )}
          </div>
        )}

        <div className="mt-8 pr-12 w-fit mx-auto">
          <Paginate {...pagination} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
