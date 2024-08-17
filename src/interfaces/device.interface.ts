import { SelectItem } from "@/types/formSelect";
import { PropsValue } from "react-select";

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
  name: string;
  type: PropsValue<SelectItem>;
  serialNumber: string;
  powerRating: string;
  voltageLevel: string;
  energySource: PropsValue<SelectItem>;
  file: File | null;
}
