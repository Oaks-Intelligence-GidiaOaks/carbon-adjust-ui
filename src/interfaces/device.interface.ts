import { SelectItem } from "@/types/formSelect";
import { PropsValue } from "react-select";

export enum AssetTabs {
  Devices = "Devices",
  Buildings = "Buildings",
  Transport = "Transport",
  Others = "Others",
}

export enum DeviceTabs {
  AddedDevices = "Added Devices",
  DispatchedDevices = "Dispatched Devices",
  DispatchHistory = "Dispatch History",
}

export enum CurrentDispatchStatus {
  Scheduled = "scheduled",
  Activated = "dispatched",
}

export enum DeviceStatus {
  Activated = "activated",
  DeActivated = "deactivated",
}

export interface IDevice {
  id?: string;
  name: string;
  type: PropsValue<SelectItem>;
  serialNos: string;
  powerRating: string;
  voltageLevel: string;
  energySource: PropsValue<SelectItem>;
  electricityProvider: PropsValue<SelectItem>;
  gasProvider: PropsValue<SelectItem>;
  file: File | null;
}

export interface ICreateDevice {
  name: string;
  type: string;
  serialNos: string;
  powerRating: string;
  voltageLevel: string;
  energySource: string;
  electricityProvider: string;
  gasProvider: string;
  file: File | null;
}

export interface IDispatchDevice {
  deviceId: string;
  dispatchWindow: string;
  workingPeriod: string;
  startTime: string;
}

export interface IAsset {
  device: IDispatchData;
}

export interface Device {
  _id?: string;
  key?: number | string;
  creator: string;
  energySource: string;
  gasProvider?: string;
  name: string;
  electricityProvider: string;
  status: string;
  currentDispatchStatus: CurrentDispatchStatus;
  currentDispatchTime: string;
  powerRating: number;
  serialNos: string;
  type: string;
  voltageLevel: string;
  file: string;
}

export interface IDispatchData {
  deviceId: string;
  dispatchWindow: number;
  workingPeriod: string;
  startTime: string;
}
