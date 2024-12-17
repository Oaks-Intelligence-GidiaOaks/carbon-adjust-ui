import axiosInstance from "@/api/axiosInstance";
import {
  IAssignUnitAdmin,
  ICreateSubUnit,
  IUnit,
} from "@/interfaces/organisation.interface";

// UNITS
export const CreateUnit = async (input: IUnit) => {
  const { data } = await axiosInstance.post("/units", input);
  return data;
};

export const AllUnits = async () => {
  const { data } = await axiosInstance.get(`/units/all`);

  return data;
};

export const AllUnitsRequests = async () => {
  const { data } = await axiosInstance.get(`/receipts/pending`);

  return data;
};

export const AssignUnitAdmin = async (input: any) => {
  const { data } = await axiosInstance.post(`/units/assign-admin`, input);
  return data;
};

export const UnAssignUnitAdmin = async (input: IAssignUnitAdmin) => {
  const { data } = await axiosInstance.post(`/units/unassign-admin`, input);
  return data;
};

export const AllAdminUnits = async () => {
  const { data } = await axiosInstance.get(`/units/admin-units`);

  return data;
};

export const UnitDetails = async (unitId: string) => {
  const { data } = await axiosInstance.get(`/units/${unitId}/unit-details`);

  return data;
};

export const AllUnitsAndDetails = async () => {
  const { data } = await axiosInstance.get(`/units/detailed-stats`);

  return data;
};

export const AdminUnitDetails = async (unitId: string) => {
  const { data } = await axiosInstance.get(`units/admin-stats/${unitId}`);

  return data;
};

export const UnitStaffDetails = async (unitId: string) => {
  const { data } = await axiosInstance.get(`units/${unitId}/staff`);

  return data;
};

export const UnitAssetDetails = async (unitId: string) => {
  const { data } = await axiosInstance.get(`units/${unitId}/assets`);

  return data;
};

// **********
// STAFF
// **********

export const CreateStaff = async (input: FormData) => {
  const { data } = await axiosInstance.post(`/corporate/staff`, input);

  return data;
};

export const AdminStaffDetails = async () => {
  const { data } = await axiosInstance.get(`/corporate/staff`);

  return data;
};

export const StaffDetails = async () => {
  const { data } = await axiosInstance.get(`/corporate/staff/get-details`);

  return data;
};

export const AllStaffByUnit = async () => {
  const { data } = await axiosInstance.get(`/corporate/staff/by-unit`);

  return data;
};

export const deleteStaff = async (staff: string) => {
  const { data } = await axiosInstance.delete(`/corporate/staff/delete/${staff}`);

  return data;
};

// **********
// SUB UNIT
// **********
export const CreateSubUnit = async (input: ICreateSubUnit) => {
  const { data } = await axiosInstance.post(`/subunits`, input);

  return data;
};

export const SubUnitDetails = async (subUnitId: string) => {
  const { data } = await axiosInstance.get(`/subunits/${subUnitId}`);

  return data;
};
