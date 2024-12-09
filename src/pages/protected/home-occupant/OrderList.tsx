import OrderCard from "@/components/reusables/OrderCard";
import { IPackageOrder } from "@/interfaces/order.interface";
import { getHoOrders } from "@/services/homeOwner";
import { useQuery } from "@tanstack/react-query";
import OrdersLoading from "@/components/reusables/OrdersLoading";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOrder } from "@/features/orderSlice";
import { clearProduct } from "@/features/productSlice";
import SocketService from "@/repository/socket";
import { RootState } from "@/app/store";
import { getBrowserAndOS } from "@/lib/utils";
import {
  IPageViewPayload,
  MonitoringEvent,
  PageEvent,
} from "@/interfaces/events.interface";
import Paginate from "@/components/reusables/Paginate";
import { PaginateProps } from "@/types/general";


type Props = {};

const OrderList = (_: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { browser, os } = getBrowserAndOS();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [pagination, setPagination] = useState<
    Omit<PaginateProps, "onPageChange">
  >({
    currentPage: 1,
    limit: 40,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });



  const pageEventPayload: IPageViewPayload = {
    name: PageEvent.ORDER_LIST,
    time: Date.now(),
    userId: user?._id as string,
    browser,
    os,
  };

  useEffect(() => {
    SocketService.emit(MonitoringEvent.NEW_PAGE_VIEW, pageEventPayload);
  }, []);

  const dispatch = useDispatch();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["get-user-orders", pagination.currentPage],
    queryFn: () => getHoOrders(pagination.limit, pagination.currentPage),
  });

  const hoOrders: IPackageOrder[] = isSuccess ? data.data.orders : [];

  useEffect(() => {
    dispatch(clearOrder());
    dispatch(clearProduct());
  }, []);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pagination.currentPage]);

  const handlePageChange = (pgNo: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: pgNo,
    }));
  };


  return (
    <div className="">
      <div className="h-[150px] bg-[#F5FAFF] flex items-center justify-between pl-6 lg:pl-[50px]">
        <h2 className="font-[500] text-xl">Order List</h2>
        
      </div>

      {/* Content Section */}
      <div
        ref={scrollRef}
        className="px-2 md:px-4 lg:w-5/6 mx-auto mt-[79px] space-y-[38px]"
      >
        {isLoading ? (
          <OrdersLoading />
        ) : (
          hoOrders.length > 0 &&
          Array.from(hoOrders, (item) => <OrderCard {...item} key={item._id} />)
        )}
      </div>

      {/* Pagination */}

      <div className="mt-8 pr-12 w-fit mx-auto">
        <Paginate {...pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default OrderList;
