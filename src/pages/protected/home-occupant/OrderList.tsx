// this page shows the list of orders

import OrderCard from "@/components/reusables/OrderCard";
import Pagination from "@/components/reusables/Pagination";
import { IPackageOrder } from "@/interfaces/order.interface";
import { getHoOrders } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Props = {};

const OrderList = (_: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-orders"],
    queryFn: () => getHoOrders(),
  });

  const hoOrders: IPackageOrder[] = isSuccess ? data.data.orders : [];

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const pagination = isSuccess && {
    limit: data.data.limit,
    prev: data.data.prev,
    next: data.data.next,
    hasPrevPage: data.data.hasPrevPage,
    hasNextPage: data.data.hasNextPage,
    currentPage: data.data.currentPage,
    total: data.data.totalOrder,
    totalPages: data.data.totalPages,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(pagination, "pagination");
  console.log(hoOrders, "ho orders");

  return (
    <div>
      <div className="h-[150px] bg-[#F5FAFF] flex items-center pl-6 lg:pl-[50px]">
        <h2 className="font-[500] text-xl">Order List</h2>
      </div>

      {/* flat list */}
      <div className="px-2 md:px-4 lg:w-5/6 mx-auto mt-[79px] space-y-[38px]">
        {hoOrders.length > 0 &&
          Array.from(hoOrders, (item) => (
            <OrderCard {...item} key={item._id} />
          ))}
      </div>

      {/* pagination */}
      <div className="mx-auto w-fit mt-8">
        {pagination && (
          <Pagination onPageChange={handlePageChange} {...pagination} />
        )}
      </div>
    </div>
  );
};

export default OrderList;
