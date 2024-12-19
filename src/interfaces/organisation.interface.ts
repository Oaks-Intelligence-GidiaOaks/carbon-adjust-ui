import { SelectItem } from "@/types/formSelect";
import { PropsValue } from "react-select";

export interface IUnit {
  _id?: string;
  name: string;
  unitFunction: string;
}

export interface IAssignUnitAdmin {
  staffId: string;
  unitId?: string;
  subUnitId?: string;
}

export interface ICreateStaff {
  email: string;
  name: string;
  jobTitle: string;
  auThorizationLevel: "FULL_ACCESS" | "RESTRICTED_ACCESS";
  unit: PropsValue<SelectItem>;
  file: File | null;
  subUnit: string;
}

export interface ICreateSubUnit {
  name: string;
  description: string;
  parentUnitId: string;
}

export interface IUnitStaff {
  createdAt: string;
  isSubUnitAdmin: boolean;
  isUnitAdmin: boolean;
  jobTitle: string;
  name: string;
  profilePicture: string;
  staffId?: string;
  _id?: string;
  updatedAt: string;
  subUnit?: {
    description: string;
    name: string;
    _id: string;
  };
}

export interface ISubUnit {
  description: string;
  name: string;
  staff: IUnitStaff[];
  subUnitAdmin: null | string;
  subUnitId: string;
  totalStaff: number;
  totalAssets: number;
  climateScore: number;
}
interface DeviceInfo {
  _id: string;
  status: string;
  file: string;
  name: string;
  type: string;
  powerRating: number;
  serialNos: string;
  fixedCarbonOffsetProgress: number;
  voltageLevel: number;
  energySource: string;
  currentDispatchStatus: string;
  electricityProvider: string;
  creator: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


export interface IAsset {
  deviceInfo: DeviceInfo; 
  assetType: string;
  approvalStatus: string;
}

export interface DepartmentWithStaffCardProps {
  _id: string;
  name: string;
  totalAssets: number;
  climateScore: number;
  staff: IUnitStaff[];
  totalStaff: number;
  subUnits: ISubUnit[];
  assets: any[];
}
