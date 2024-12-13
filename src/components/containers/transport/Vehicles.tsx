import { BiSearch } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui";
import { PlusIcon } from "@/assets/icons";
import TransportCard from "./TransportCard";
import { useEffect, useRef, useState } from "react";
import OptimizeModal from "./OptimizeModal";
import { getTransports } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";
import { Transport } from "@/interfaces/transport.interface";
import Paginate from "@/components/reusables/Paginate";
import { PaginateProps } from "@/types/general";
import NoDevices from "../devices/NoDevices";
import { useDebounce } from "@/hooks/useDebounce";
import TransportHistoryCardSkeleton from "./CardSkeleton";
import TransportChartCard from "./TransportChartCard";
import TransportLineChart from "./TransportLineChart";
import TransportBarChart from "./TransportBarChart";

const Vehicles = () => {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [ids, setIds] = useState<string[]>([]);
  const chartAreaRef = useRef<HTMLDivElement>(null);
  const [pagination, setPagination] = useState<
    Omit<PaginateProps, "onPageChange">
  >({
    currentPage: 1,
    limit: 20,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });

  const { pathname } = useLocation();
  const type = pathname.includes("/organisation")
    ? "organisation"
    : "dashboard";

  const debouncedSearch = useDebounce(searchQuery, 500);

  const {
    data: transports,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transports", debouncedSearch],
    queryFn: () => getTransports(debouncedSearch),
    enabled: true,
  });

  const Vehicles = transports?.data?.transportations?.length > 0;

  useEffect(() => {
    setPagination({
      currentPage: transports?.data.page,
      hasNextPage: transports?.data.hasNextPage,
      hasPrevPage: transports?.data.hasPrevPage,
      limit: transports?.data.limit,
      totalPages: transports?.data.totalPages,
    });
  }, [transports?.data]);

  const handlePageChange = (pgNo: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: pgNo,
    }));

    refetch();
  };

  useEffect(() => {
    if (ids.length > 0) {
      chartAreaRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [ids]);

  const transportData = transports?.data?.transportations;

  const toggleMasterChecked = (checked: boolean) => {
    setIsChecked(checked);
    if (checked) {
      const allIds = transportData?.map((item: any) => item._id) || [];
      setIds(allIds);
    } else {
      setIds([]);
    }
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
              placeholder="Search vehicle, car model"
              className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center">
          {Vehicles && (
            <Button
              onClick={() => setShowModal(true)}
              variant={"outline"}
              className="rounded-[20px] border-cyan-700 flex-center gap-1 "
            >
              Optimize trip
            </Button>
          )}
          <Link className="ml-5" to={`/${type}/transport/add`}>
            <Button className="rounded-[20px] flex-center gap-1 ">
              <span>Add Transport</span>
              <PlusIcon />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-end items-end my-3 mr-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => toggleMasterChecked(e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <span className="text-sm font-medium">Select All</span>
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
            {Vehicles ? (
              Array.from(
                transports.data.transportations as Transport[],
                (it, i) => (
                  <TransportCard {...it} key={i} setIds={setIds} ids={ids} />
                )
              )
            ) : (
              <div className="h-32 grid place-items-center max-w-[98%]">
                {searchQuery ? (
                  <NoDevices
                    empty={true}
                    link={`/${type}/transport/add`}
                    text="Transport"
                  />
                ) : (
                  <NoDevices link={`/${type}/transport/add`} text="Transport" />
                )}
              </div>
            )}
          </>
        )}
      </div>

      {showModal && <OptimizeModal setShowModal={setShowModal} />}
      {/* Pagination */}
      {Vehicles && (
        <div className="mt-8 pr-12 w-fit mx-auto">
          <Paginate {...pagination} onPageChange={handlePageChange} />
        </div>
      )}
      {Vehicles && (
        <div ref={chartAreaRef}>
          <TransportLineChart ids={ids} />
          <TransportBarChart ids={ids} />
          <TransportChartCard ids={ids} />
        </div>
      )}
    </div>
  );
};

export default Vehicles;
