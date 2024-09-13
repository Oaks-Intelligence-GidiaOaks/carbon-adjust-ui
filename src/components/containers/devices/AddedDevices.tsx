import { BiSearch } from "react-icons/bi";
import DeviceCard from "./DeviceCard";
import NoDevices from "@/components/containers/devices/NoDevices";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { PlusIcon } from "@/assets/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dispatchDevice, getUserDevices } from "@/services/homeOwner";
import { Device, IDispatchData } from "@/interfaces/device.interface";
import Loading from "@/components/reusables/Loading";
import DeviceDialog from "@/components/dialogs/DeviceDialog";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearDevice } from "@/features/assetSlice";
import Paginate from "@/components/reusables/Paginate";
import { PaginateProps } from "@/types/general";
import { useEffect, useState } from "react";

const AddedDevices = () => {
  const { device } = useSelector((state: RootState) => state.assets);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState<
    Omit<PaginateProps, "onPageChange">
  >({
    currentPage: 1,
    limit: 20,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });

  const {
    data: userDevices,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-devices", pagination.currentPage],
    queryFn: () => getUserDevices(pagination.limit, pagination.currentPage),
  });

  useEffect(() => {
    if (userDevices?.data)
      setPagination({
        currentPage: userDevices?.data.currentPage,
        hasNextPage: userDevices?.data.hasNextPage,
        hasPrevPage: userDevices?.data.hasPrevPage,
        limit: userDevices?.data.limit,
        totalPages: userDevices?.data.totalPages,
      });
  }, [userDevices?.data]);

  const handlePageChange = (pgNo: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: pgNo,
    }));

    refetch();
  };

  const DispatchDevice = useMutation({
    mutationKey: ["dispatch-device"],
    mutationFn: (input: IDispatchData) =>
      dispatchDevice({
        ...input,
        dispatchWindow: Number(input.dispatchWindow),
      }),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
    onSettled: () => {
      dispatch(clearDevice());
      queryClient.invalidateQueries({ queryKey: ["user-devices"] });
    },
  });

  if (isLoading) {
    return (
      <div className="h-32 grid place-items-center">
        <Loading message="loading" />
      </div>
    );
  }

  if (userDevices?.data?.devices.length === 0) {
    return (
      <div className="h-32 grid place-items-center">
        <NoDevices link="/dashboard/devices/add" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex-center mt-[15px]">
        <div className="relative border border-border rounded-lg h-10 p-0 bg-white md:w-[350px]">
          <BiSearch className="absolute top-2 left-2.5 opacity-40" size={24} />
          <input
            name="search"
            placeholder="Search here"
            className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
            onChange={() => {}}
          />
        </div>

        <Link className="ml-auto" to="/dashboard/devices/add">
          <Button className="rounded-[20px] flex-center gap-1 ">
            <span>Add device</span>
            <PlusIcon />
          </Button>
        </Link>
      </div>

      <div className="mt-[15px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-5">
        {Array.from(userDevices.data.devices as Device[], (it, i) => (
          <DeviceCard {...it} key={i} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 pr-12 w-fit mx-auto">
        <Paginate {...pagination} onPageChange={handlePageChange} />
      </div>

      {Boolean((device.deviceId as string).length) && (
        <DeviceDialog
          deviceId={device.deviceId as string}
          actions={[
            {
              text: "Cancel",
              actionType: "secondary",
              onClick: () => dispatch(clearDevice()),
            },
            {
              text: "Yes",
              actionType: "default",
              onClick: () => DispatchDevice.mutate(device),
            },
          ]}
          headerText="Schedule Device"
          leadText={`Are you sure you want to schedule your device window for ${device.dispatchWindow} hours  and Device duration for ${device.workingPeriod.hh} hours ${device.workingPeriod.mm} minutes`}
        />
      )}
    </div>
  );
};

export default AddedDevices;
