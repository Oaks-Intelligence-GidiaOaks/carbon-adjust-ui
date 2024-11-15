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
  Initiated = "initiated",
}

export enum DeviceStatus {
  Activated = "activated",
  DeActivated = "deactivated",
}

export enum DeviceDispatchStatus {
  DISPATCH = "dispatched",
  SCHEDULE = "scheduled",
  PROCESSED = "processed",
  CANCELLED = "cancelled",
  RECEIVED = "received",
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
  device: Device;
  workingPeriod: string;
  startTime: string;
  estimatedCC: number;
  actualCC: number;
  status: DeviceDispatchStatus;
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
  workingPeriod: {
    hh: number;
    mm: number;
  };
  startTime: string;
}

export interface IDispatchTimeline {
  status: "processed" | "received"; // make enum
  timestamp: Date;
  _id: string;
}

export interface INotificationTimes {
  scheduleTime: Date;
  status: string;
  _id: string;
}

export interface IDispatchDevice {
  bestDispatchStartTime: Date;
  createdAt: Date;
  creator: string;
  device: Device;
  dispatchStartTime: string;
  dispatchTimeline: Array<IDispatchTimeline>;
  dispatchWindowInHours: number;
  notificationTimes: Array<INotificationTimes>;
  status: DeviceDispatchStatus;
  taskId: string;
  updatedAt: Date;
  wpInHours: string;
  wpInHoursTimestamp: Date;
  _id: string;
}

export interface IPowerLimit {
  from_time: string;
  to_time: string;
  consumption_limit: number;
}

export interface IDeviceChartData {
  from_date: Date;
  to_date: Date;
  emissions: number;
  total_power: number;
  no_devices: number;
  power_limit: number;
}
