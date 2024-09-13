import axiosInstance from "@/api/axiosInstance";

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get(`/packages/categories`);

  return data;
};

export const addPackageCategory = async (iData: any) => {
  // schema
  // {
  //     "name":"Home Energy plans"
  // }

  const { data } = await axiosInstance.post(`/packages/category`, iData);

  return data;
};

// Package Schedule
export const getScheduleMetaData = async () => {
  const { data } = await axiosInstance.get(`/booking/schedule-metadata`);

  return data;
};

export const createScheduleSlot = async (iData: any) => {
  const { data } = await axiosInstance.post(
    `/booking/schedule/generate-slot`,
    iData
  );

  return data;
};

export const activateScheduleSlots = async (iData: any) => {
  const { data } = await axiosInstance.patch(
    `/booking/schedule/activate-slot`,
    iData
  );

  return data;
};

export const getRecentPackages = async () => {
  const { data } = await axiosInstance.get(`/packages/recent`);

  return data;
};

export const getAllPackages = async () => {
  const { data } = await axiosInstance.get(`/packages`);

  return data;
};

export const getEarnings = async () => {
  const { data } = await axiosInstance.get(`/application/merchant/earnings`);

  return data;
};

export const getAllApplications = async (page?: number, limit?: number) => {
  const queryParams = new URLSearchParams();

  if (page !== undefined) {
    queryParams.append("page", page.toString());
  }

  if (limit !== undefined) {
    queryParams.append("limit", limit.toString());
  }

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : "";

  const { data } = await axiosInstance.get(
    `/application/merchant${queryString}`
  );

  return data;
};

export const getApplicationsChart = async (year: number) => {
  const { data } = await axiosInstance.get(
    `/application/merchant/monthly-chart?year=${year}`
  );

  return data;
};

export const getPackageDetails = async (packageId: string) => {
  const { data } = await axiosInstance.get(`/packages/${packageId}`);

  return data;
};

export const getOrderDetails = async (packageId: string) => {
  const { data } = await axiosInstance.get(`/application/${packageId}`);

  return data;
};

export const getPackageSchedules = async (packageId: string) => {
  const { data } = await axiosInstance.get(`/packages/${packageId}/schedules`);
  return data;
};

export const createPackage = async (iData: any) => {
  const { data } = await axiosInstance.post(`/packages`, iData);

  return data;
};

export const publishPackage = async (packageId: string) => {
  const { data } = await axiosInstance.patch(`/packages/${packageId}/publish`);

  return data;
};

export const unPublishPackage = async (packageId: string) => {
  const { data } = await axiosInstance.patch(
    `/packages/${packageId}/unpublish`
  );

  return data;
};

// DEVICES
export const createDevice = async (payload: {}) => {
  const { data } = await axiosInstance.post(`/devices`, payload);

  return data;
};

// For Report Merchant And Admin Staff
export const uploadReport = async (orderId: string, formData: FormData) => {
  const { data } = await axiosInstance.patch(
    `/application/${orderId}/report`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};
