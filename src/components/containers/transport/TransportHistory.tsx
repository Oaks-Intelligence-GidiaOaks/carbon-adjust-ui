// import Loading from "@/components/reusables/Loading";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { PlusIcon } from "@/assets/icons";
import TransportHistoryCard from "./TransportHistoryCard";
import { PaginateProps } from "@/types/general";
import { getTransportsHistory } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";
import { Trips } from "@/interfaces/transport.interface";
import Paginate from "@/components/reusables/Paginate";
import NoDevices from "../devices/NoDevices";
import { useDebounce } from "@/hooks/useDebounce";
import TransportHistoryCardSkeleton from "./CardSkeleton";

const TransportHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<
    Omit<PaginateProps, "onPageChange">
  >({
    currentPage: 1,
    limit: 20,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });

  const debouncedSearch = useDebounce(searchQuery, 500);

  const {
    data: transportsHistory,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transportsHistory", debouncedSearch],
    queryFn: () => getTransportsHistory(debouncedSearch, ""),
    enabled: true,
  });

  const Histories = transportsHistory?.data?.trips?.length > 0;

  useEffect(() => {
    setPagination({
      currentPage: transportsHistory?.data.page,
      hasNextPage: transportsHistory?.data.hasNextPage,
      hasPrevPage: transportsHistory?.data.hasPrevPage,
      limit: transportsHistory?.data.limit,
      totalPages: transportsHistory?.data.totalPages,
    });
  }, [transportsHistory?.data]);

  const handlePageChange = (pgNo: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: pgNo,
    }));

    refetch();
  };
  return (
    <div>
      <div className="flex justify-between flex-wrap mt-[15px] gap-5">
        <div className="flex items-center justify-center gap-5">
          <Button variant={"outline"} className="flex gap-2 ">
            <IoFilterSharp />
            <span className="md:block hidden">Filter by date</span>
          </Button>
          <div className="relative border border-border rounded-lg h-10 p-0 bg-white md:w-[350px] w-[250px]">
            <BiSearch
              className="absolute top-2 left-2.5 opacity-40"
              size={24}
            />
            <input
              name="search"
              placeholder="Search transport type, mode of transport"
              className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Link className="ml-5" to="/dashboard/transport/add">
            <Button className="rounded-[20px] flex-center gap-1 ">
              <span>Add Transport</span>
              <PlusIcon />
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-[20px] space-y-[38px]">
        {/* Render loading state if isLoading is true */}
        {isLoading ? (
          <div className="h-32 grid place-items-center">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col mb-10 w-full">
                <TransportHistoryCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Render transport records if available */}
            {Histories ? (
              Array.from(transportsHistory.data.trips as Trips[], (it, i) => (
                <TransportHistoryCard {...it} key={i} />
              ))
            ) : (
              <div className="h-32 grid place-items-center max-w-[98%]">
                {searchQuery ? (
                  <div>No Result matched your query</div>
                ) : (
                  <NoDevices link="/dashboard/transport/add" text="Transport" />
                )}
              </div>
            )}
          </>
        )}
      </div>
      {/* Pagination */}
      {Histories && (
        <div className="mt-8 pr-12 w-fit mx-auto">
          <Paginate {...pagination} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
};

export default TransportHistory;
