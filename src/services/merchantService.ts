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

export const getGrantPackages = async ({
  page = 1,
  limit = 100,
}: {
  page?: number;
  limit?: number;
}) => {
  let url = `/packages/grant-packages`;

  const queryParams = new URLSearchParams();

  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  // url += `?${queryParams.toString()}`;

  const { data } = await axiosInstance.get(url);

  return data;
};

export const getEarnings = async () => {
  const { data } = await axiosInstance.get(`/application/merchant/earnings`);

  return data;
};

// Applications
export const getAllApplications = async (
  q: string,
  page?: number,
  limit?: number
) => {
  const queryParams = new URLSearchParams();

  if (page !== undefined) {
    queryParams.append("page", page.toString());
  }

  if (limit !== undefined) {
    queryParams.append("limit", limit.toString());
  }

  queryParams.append("q", q);

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

// Get SubApplications by PackageID
export const getSuperMerchantSubApplications = async (
  applicationId: string,
  limit: number = 100,
  page: number = 1
) => {
  let url = `/application/ho/${applicationId}`;

  const queryParams = new URLSearchParams();

  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  url += `?${queryParams.toString()}`;

  const { data } = await axiosInstance.get(url);

  return data;
};

export const approveGrantApplication = async (inputData: FormData) => {
  const { data } = await axiosInstance.put(`/application/approve`, inputData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const rejectGrantApplication = async (inputData: FormData) => {
  const { data } = await axiosInstance.put(`/application/reject`, inputData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

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

// CLAIM
export const createClaim = async (arg: {
  inputData: FormData;
  packageId: string;
}) => {
  const { data } = await axiosInstance.post(
    `/claims/${arg.packageId}`,
    arg.inputData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const grantMerchantClaims = async () => {
  const { data } = await axiosInstance.get(`/claims/get-claims`);

  return data;
};

export const getCustomerClaims = async () => {
  const { data } = await axiosInstance.get(`/claims/customer-claims`);

  return data;
};

export const updateClaimStatus = async (arg: {
  claimId: string;
  status: string;
}) => {
  const { data } = await axiosInstance.patch(`claims/${arg.claimId}/status`, {
    status: arg.status,
  });

  return data;
};
