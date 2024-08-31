import Search from "@/components/ui/Search";
import DeviceHistoryCard from "./DeviceHistoryCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/CardPagination";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/reusables/Loading";
import { getDispatchedDevices } from "@/services/homeOwner";
import { IDispatchDevice } from "@/interfaces/device.interface";

const DispatchHistory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dispatch-devices"],
    queryFn: () => getDispatchedDevices(),
  });

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

      <div className="mt-4 w-fit ml-auto">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default DispatchHistory;
