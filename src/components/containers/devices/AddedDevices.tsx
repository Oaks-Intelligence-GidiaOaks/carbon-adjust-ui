import { BiSearch } from "react-icons/bi";
import DeviceCard from "./DeviceCard";
import NoDevices from "@/components/containers/devices/NoDevices";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui";
import { PlusIcon } from "@/assets/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dispatchDevice, getUserDevices } from "@/services/homeOwner";
import { Device, IDispatchData } from "@/interfaces/device.interface";
import DeviceDialog from "@/components/dialogs/DeviceDialog";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearDevice } from "@/features/assetSlice";
import Paginate from "@/components/reusables/Paginate";
import { PaginateProps } from "@/types/general";
import { useEffect, useRef, useState } from "react";
import DeleteDeviceModal from "@/components/dialogs/DeleteDeviceModal";
import useMutations from "@/hooks/useMutations";
import DeviceSkeletonLoader from "@/components/reusables/device/DeviceSkeletonLoader";
import CancelDeviceScheduleModal from "@/components/dialogs/CancelDeviceScheduleModal";
import { GroupDevicesModal } from "../organisation/devices";
import LinkToUnitModal from "../organisation/devices/LinkToUnitModal";
import AssignStaffModal from "../organisation/devices/AssignStaff";
import { MdMoreVert } from "react-icons/md";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { IoIosArrowForward } from "react-icons/io";
import { LinkDeviceModal } from "./LinkDevices";

const AddedDevices = () => {
  const { pathname } = useLocation();
  const [id, setId] = useState<string | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [cardActions, setCardActions] = useState<boolean>(false);
  const [isLinkDeviceModalOpen, setIsLinkDeviceModalOpen] = useState(false);
 
  const actionsRef = useRef<null | HTMLDivElement>(null);
  const { device } = useSelector((state: RootState) => state.assets);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { DeleteDevice, CancelDeviceSchedule } = useMutations();
  useOutsideCloser(actionsRef, cardActions, setCardActions);

  const type = pathname.includes("/organisation")
    ? "organisation"
    : "dashboard";
  const [pagination, setPagination] = useState<
    Omit<PaginateProps, "onPageChange">
  >({
    currentPage: 1,
    limit: 20,
    hasNextPage: false,
    hasPrevPage: false,
    totalPages: 1,
  });

  const { data: userDevices, isLoading } = useQuery({
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
  };
  const handleOpenLinkDeviceModal = () => {
    setIsLinkDeviceModalOpen(true);
  };

  const handleCloseLinkDeviceModal = () => {
    setIsLinkDeviceModalOpen(false);
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
    return <DeviceSkeletonLoader />;
  }

  if (userDevices?.data?.devices.length === 0) {
    return (
      <div className="h-32 grid place-items-center max-w-[98%]">
        <NoDevices link={`/${type}/devices/add`} />
      </div>
    );
  }

  const CardActions = () => (
    <div
      ref={actionsRef}
      className="absolute bg-white top-8 right-2 max-w-[150px] shadow-lg border space-y-2 rounded-[10px] px-2 py-3 z-10"
    >
      <div onClick={handleOpenLinkDeviceModal}className="text-[#414141] w-full cursor-pointer bg-[#EFF4FF99] rounded-md font-[400] font-sans text-[11px] text-center py-1 px-3 ">
        <span>Link to Building</span>
      </div>
      <div
        onClick={() => setShowUnitModal(true)}
        className="text-[#414141] w-full cursor-pointer bg-[#EFF4FF99] rounded-md font-[400] font-sans text-[11px] text-center py-1 px-3 "
      >
        <span>Assign to Unit</span>
      </div>

      <button
        /// onClick={() => props.setId(props._id as string)}
        className={` text-[#E71D36] cursor-pointer bg-[#EFF4FF99] rounded-md font-[400] font-sans text-[11px] text-center py-1 px-3 `}
      >
        <span>Delete Group</span>
      </button>
    </div>
  );

  const handleDeleteDevice = async () => {
    await DeleteDevice.mutateAsync(id as string, {
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            "Error Deleting device. Please try again!"
        );
      },
      onSettled: () => {
        setId(null);
        queryClient.invalidateQueries({ queryKey: ["user-devices"] });
      },
    });
  };

  const handleCancelSchedule = async () => {
    await CancelDeviceSchedule.mutateAsync(cancelId as string, {
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
            "Error Canceling  device Schedule. Please try again!"
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["user-devices"] });
        setCancelId(null);
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between mt-[15px]">
        <div className="relative border border-border rounded-lg h-10 p-0 bg-white md:w-[350px] w-[300px]">
          <BiSearch className="absolute top-2 left-2.5 opacity-40" size={24} />
          <input
            name="search"
            placeholder="Search here"
            className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
            onChange={() => {}}
          />
        </div>
        <div className="flex items-center gap-4">
          {type === "organisation" && (
            <Button
              onClick={() => setShowModal(true)}
              variant={"outline"}
              className="rounded-[20px] border-blue-600 hover:text-blue-600 flex-center gap-1 text-blue-600"
            >
              Group Devices
            </Button>
          )}

          <Link to={`/${type}/devices/add`}>
            <Button className="rounded-[20px] flex-center gap-1 ">
              <span className="md:block hidden">Add device</span>
              <PlusIcon />
            </Button>
          </Link>
        </div>
      </div>
      {type === "organisation" && (
        <div className="flex relative items-center justify-between p-3 max:w-[95%] mt-10">
          <div className="flex items-center gap-3">
            <h2 className="font-inter font-medium  lg:text-2xl text-[#667085]">
              Household Devices
            </h2>
            <span className="bg-[#F7FBFE] shadow-lg p-2">
              <IoIosArrowForward />
            </span>
          </div>
          <div>
            <MdMoreVert
              onClick={() => setCardActions(!cardActions)}
              className="cursor-pointer"
            />
            {cardActions && <CardActions />}
          </div>
        </div>
      )}
      <div className="mt-[15px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-5">
        {Array.from(userDevices.data.devices as Device[], (it, i) => (
          <DeviceCard
            setShowUnitModal={setShowUnitModal}
            setShowStaffModal={setShowStaffModal}
            setCancelId={setCancelId}
            setId={setId}
            {...it}
            key={i}
          />
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
              isLoading: DispatchDevice.isPending,
            },
          ]}
          headerText="Schedule Device"
          leadText={`Are you sure you want to schedule your device window for ${device.dispatchWindow} hours  and Device duration for ${device.workingPeriod.hh} hours ${device.workingPeriod.mm} minutes`}
        />
      )}

      {id && (
        <DeleteDeviceModal
          cancel={setId}
          deletee={handleDeleteDevice}
          isPending={DeleteDevice.isPending}
        />
      )}

      {cancelId && (
        <CancelDeviceScheduleModal
          hide={setCancelId}
          cancel={handleCancelSchedule}
          isPending={CancelDeviceSchedule.isPending}
        />
      )}
      {showUnitModal && <LinkToUnitModal setShowModal={setShowUnitModal} />}
      {showModal && <GroupDevicesModal setShowModal={setShowModal} />}
      {showStaffModal && (
        <AssignStaffModal setShowStaffModal={setShowStaffModal} />
      )}
      {isLinkDeviceModalOpen && (
        <LinkDeviceModal
          onClose={handleCloseLinkDeviceModal}
          deviceId={"4536g"}
        />
      )}
    </div>
  );
};

export default AddedDevices;
