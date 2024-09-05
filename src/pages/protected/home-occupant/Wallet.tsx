import DeviceHistoryCard from "@/components/containers/devices/DeviceHistoryCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/CardPagination";
import WalletCard from "@/components/ui/WalletCard";

const Wallet = () => {
  return (
    <div className="p-6 bg-[#F9FCFD]">
      <div>
        <h2 className="text-[#333333] font-[600] text-[24px]">Wallet</h2>
        <p className="text-[#575757] text-base ">
          Manage your payments and transactions
        </p>
      </div>

      <div className="mt-[40px]">
        <WalletCard />
      </div>

      <div>
        <div className="flex-center justify-between mt-10 pb-6 ">
          <h2 className="text-[#333333] font-[600] text-[24px]">
            Transaction History
          </h2>
        </div>

        <div className="space-y-5">
          {Array.from({ length: 3 }, (_, i) => (
            // @ts-ignore
            <DeviceHistoryCard key={i} />
          ))}
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
    </div>
  );
};

export default Wallet;
