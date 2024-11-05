import { cancelDeviceSchedule, deleteDevice } from "@/services/homeOwner";
import { useMutation } from "@tanstack/react-query";
// import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

const useMutations = () => {
  // DEVICE
  const DeleteDevice = useMutation({
    mutationKey: ["delete-device"],
    mutationFn: (deviceId: string) => deleteDevice(deviceId),
    onError: (err: any) => {
      toast.error(
        err.response.data.message ||
          "Error deleting device. Please try again..."
      );
    },
    onSuccess: (sx: any) => {
      toast.success(sx.message);
    },
  });

  const CancelDeviceSchedule = useMutation({
    mutationKey: ["cancel-device-schedule"],
    mutationFn: (deviceId: string) => cancelDeviceSchedule(deviceId),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
    },
  });

  return {
    DeleteDevice,
    CancelDeviceSchedule,
  };
};

export default useMutations;
