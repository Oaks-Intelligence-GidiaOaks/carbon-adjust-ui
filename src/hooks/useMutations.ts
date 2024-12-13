import {
  IAssignUnitAdmin,
  ICreateSubUnit,
} from "@/interfaces/organisation.interface";
import { WalletCoinSettingsInput } from "@/interfaces/wallet.interface";
import { setCoinSettings } from "@/services/adminService";
import {
  cancelDeviceSchedule,
  deleteDevice,
  movePointToCash,
  sendOtpCoins,
  sendOtpRcmb,
  verifyTransferCoins,
  verifyTransferRcmb,
} from "@/services/homeOwner";
import { AssignUnitAdmin, CreateSubUnit } from "@/services/organisation";
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

  // WALLET
  const TransferPointToCash = useMutation({
    mutationKey: ["point-cash-wallet"],
    mutationFn: (amount: number) => movePointToCash(amount),
  });

  const SendRcmbOTP = useMutation({
    mutationKey: ["send-rcmb-otp"],
    mutationFn: (arg: { receiverWalletAddress: string; amount: number }) =>
      sendOtpRcmb(arg),
  });

  const SendCoinsOTP = useMutation({
    mutationKey: ["send-coins-otp"],
    mutationFn: (arg: { receiverWalletAddress: string; amount: number }) =>
      sendOtpCoins(arg),
  });

  const VerifyRcmbOtp = useMutation({
    mutationKey: ["verify-rcmb-otp"],
    mutationFn: (otp: string) => verifyTransferRcmb(otp),
  });

  const VerifyCoinsOtp = useMutation({
    mutationKey: ["verify-coins-otp"],
    mutationFn: (otp: string) => verifyTransferCoins(otp),
  });

  const UpdateCoinSettings = useMutation({
    mutationKey: ["set-coin-settings"],
    mutationFn: (settings: WalletCoinSettingsInput) =>
      setCoinSettings(settings),
  });

  // ORGANISATION/CORPORATE
  const MakeunitAdmin = useMutation({
    mutationKey: ["make-unit-admin"],
    mutationFn: (input: IAssignUnitAdmin) => AssignUnitAdmin(input),
  });

  const AddSubUnit = useMutation({
    mutationKey: ["new-sub-unit"],
    mutationFn: (input: ICreateSubUnit) => CreateSubUnit(input),
  });

  return {
    DeleteDevice,
    CancelDeviceSchedule,
    TransferPointToCash,
    SendRcmbOTP,
    SendCoinsOTP,
    VerifyRcmbOtp,
    VerifyCoinsOtp,
    UpdateCoinSettings,
    MakeunitAdmin,
    AddSubUnit,
  };
};

export default useMutations;
