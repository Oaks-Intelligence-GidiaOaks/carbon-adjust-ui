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

export enum DeviceStatus {
  NoDispatch = "No Dispatch",
  Dispatched = "Dispatched",
  Ongoing = "Ongoing",
}

export interface IDevice {
  id?: string;
  name: string;
  type: PropsValue<SelectItem>;
  serialNumber: string;
  powerRating: string;
  voltageLevel: string;
  energySource: PropsValue<SelectItem>;
  file: File | null;
}

export interface IAsset {
  device: Partial<IDevice>;
}

export interface Device {
  id?: string;
  device_id: string;
  application_id: string;
  "device ip address": string;
  "power rating": number;
  "voltage level": string;
}
