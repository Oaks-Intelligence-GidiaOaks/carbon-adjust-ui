import OrdersGrid from "@/components/grid/admin/AdminOrdersGrid";
import { getAdminApplications } from "@/services/adminService";
import { transformApplicationsGridData } from "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["get-admin-applications"],
    queryFn: () => getAdminApplications(),
  });

  const NoOrders = () => (
    <div className="h-[80vh] grid place-items-center">
      <h2 className="text-lg font-[600] mr-auto text-[#333333]">All Orders</h2>

      <div className=" h-fit w-fit text-[#575757] font-[400] flex flex-col gap-3 items-center ">
        <img src="/assets/graphics/no-package.svg" className="" alt="" />

        <h2 className="font-[600] text-lg ">No Orders yet</h2>

        <p className="text-sm font-[400] w-2/5 text-center">
          Looks like you don’t any orders yet. Your orders will appear here when
          users request a service.
        </p>
      </div>
    </div>
  );

  const tableApps = isSuccess
    ? transformApplicationsGridData(data.data.orders)
    : [];

  if (!tableApps.length) {
    return;
  }

  return (
    <div className="px-3 lg:px-4">
      <h2 className="font-[600] text-lg pt-2 ">Orders</h2>

      {!isLoading &&
        (tableApps.length > 0 ? (
          <div className="-mt-3">
            <OrdersGrid isUpdating data={tableApps} />
          </div>
        ) : (
          <NoOrders />
        ))}
    </div>
  );
};

export default Orders;
