import { cancelDeviceSchedule, deleteDevice } from "@/services/homeOwner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useMutations = () => {
  const queryClient = useQueryClient();

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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-devices"] });
    },
  });

  const CancelDeviceSchedule = useMutation({
    mutationKey: ["cancel-device-schedule"],
    mutationFn: (deviceId: string) => cancelDeviceSchedule(deviceId),
    onError: (err: any) => {
      toast.error(
        err.response.data.message ||
          "Error cancelling device. Please try again..."
      );
    },
    onSuccess: (sx: any) => {
      toast.success(sx.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-devices"] });
    },
  });

  return {
    DeleteDevice,
    CancelDeviceSchedule,
  };
};

export default useMutations;
