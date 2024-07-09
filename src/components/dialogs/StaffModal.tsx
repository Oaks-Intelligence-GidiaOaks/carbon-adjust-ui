import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui";
import { BiSearch } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignApplicationsToStaffQuery,
  getAllStaff,
} from "@/services/merchant";
import { AuthUserProfile } from "@/types/general";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import Loading from "../reusables/Loading";
import { HiOutlineUserMinus } from "react-icons/hi2";
import { filterByName } from "@/utils";

type Props = {
  onClose: () => void;
  showStaffModal: boolean;
  setShowStaffModal: React.Dispatch<React.SetStateAction<boolean>>;
  rowId: null | string;
};

const StaffModal = (props: Props) => {
  const queryClient = useQueryClient();
  const ref = useRef(null);
  useOutsideCloser(ref, props.showStaffModal, props.setShowStaffModal);

  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const staff = useQuery({
    queryKey: ["get-all-staff", searchQuery],
    queryFn: () => getAllStaff(),
  });

  const [allStaff, setAllStaff] = useState<AuthUserProfile[]>(
    staff.data?.data?.data?.users ?? []
  );

  const assignApplicationsToStaff = useMutation({
    mutationKey: ["assign-app-to-staff"],
    mutationFn: (data: { applications: string[]; assignee: string }) =>
      assignApplicationsToStaffQuery(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-applications"] });
      toast.success("Application assigned successfully");
      props.onClose();
    },
    onError: () => {
      toast.error("Error encountered while assigning application");
    },
  });

  const handleAssign = (staffId: string) => {
    assignApplicationsToStaff.mutate({
      applications: [props.rowId!],
      assignee: staffId,
    });
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setAllStaff(
        filterByName(staff.data?.data?.data?.users ?? [], searchQuery)
      );
    } else {
      setAllStaff(staff.data?.data?.data?.users ?? []);
    }
  }, [searchQuery, staff.isSuccess]);

  return (
    <div className="fixed z-[10000000] inset-0 bg-gray-500/20 backdrop-blur-sm flex justify-center items-center">
      <div
        ref={ref}
        className="w-[95%] sm:w-1/2 max-w-[513px] min-w-[240px] h-[clamp(400px,60%,688px)] flex flex-col bg-white shadow-lg rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gray-100/70 p-8 pb-4 flex justify-between gap-x-4 items-start">
          <div>
            <p className="font-bold text-lg text-[#091E42]">
              Assign Application
            </p>
            <p className="text-sm text-gray-400 mt-1 font-dm-sans">
              Assign staff to an application
            </p>
          </div>
          <button
            onClick={props.onClose}
            className="size-6 rounded-full bg-white p-1 hover:bg-gray-200"
          >
            <XMarkIcon />
          </button>
        </div>
        {/* Staff */}
        <div className="px-4 sm:px-6 mt-6 flex flex-1 flex-col">
          {/* Searchbar */}
          <div className="relative border border-border rounded-lg h-10 p-0 bg-white">
            <BiSearch
              className="absolute top-2 left-2.5 opacity-40"
              size={24}
            />
            <input
              name="search"
              placeholder="Search for a staff"
              className="h-full w-full pl-10 m-0 bg-transparent text-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* All staff */}

          <div className="mt-4 p-2 flex-1 max-h-[280px] flex flex-col gap-2 border border-border rounded-lg overflow-scroll">
            {staff.isLoading && (
              <div className="mt-4 flex justify-center items-center">
                <Loading message="" />
              </div>
            )}
            {staff.isSuccess && Boolean(allStaff.length < 1) && (
              <div className="mt-4 flex flex-col gap-y-4 justify-center items-center">
                <HiOutlineUserMinus className="text-gray-500 size-10" />
                <p className="text-center text-gray-500">
                  You do not have any staff.
                </p>
              </div>
            )}
            {Boolean(allStaff.length) &&
              allStaff.map((staff: AuthUserProfile) => (
                <div
                  key={staff._id}
                  onClick={() => setSelectedStaffId(staff._id)}
                  className="p-2 rounded-lg border border-border flex gap-x-4 items-center justify-between hover:bg-gray-100 hover:shadow-lg cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-x-2 ">
                    <div className="size-8 p-1 rounded-full bg-gray-200">
                      <UserIcon className="text-[24px]" />
                    </div>
                    <p>{staff.name}</p>
                  </div>
                  <input
                    type="radio"
                    className="accent-ca-blue"
                    value={staff.name}
                    checked={staff._id === selectedStaffId}
                  />
                </div>
              ))}
          </div>
        </div>
        {/* Footer */}
        <div className="px-4 sm:px-6 flex justify-end gap-x-4 h-12 my-4">
          <Button
            onClick={props.onClose}
            variant={"ghost"}
            className="border border-border rounded-full text-gray-600"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleAssign(selectedStaffId!)}
            disabled={
              selectedStaffId === null || assignApplicationsToStaff.isPending
            }
            className="rounded-lg"
          >
            {assignApplicationsToStaff.isPending ? (
              <Oval
                visible={assignApplicationsToStaff.isPending}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Assign</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffModal;
