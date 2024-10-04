import axiosInstance from "@/api/axiosInstance";
import { IDispatchData } from "@/interfaces/device.interface";
import { IAddReview } from "@/interfaces/product.interface";
import { formatNumber } from "@/lib/utils";

export const getAllPackageCategories = async () => {
  const { data } = await axiosInstance.get(`/packages/categories`);
  return data;
};

export const getHomePagePackages = async () => {
  const { data } = await axiosInstance.get(`/packages/store/home`);
  return data;
};

export const getHomePageFreebies = async () => {
  const { data } = await axiosInstance.get(`/packages/store/freebies`);

  return data;
};

export const getBestSellerPackages = async () => {
  const { data } = await axiosInstance.get(`/packages/store/best-sellers`);

  return data;
};

export const getPackagesByCategorySlug = async (slug: string) => {
  const { data } = await axiosInstance.get(`packages/store/category/${slug}`);

  return data;
};

// ORDER
export const getHoOrders = async () => {
  const { data } = await axiosInstance.get(`application/orders`);

  return data;




};

export const createNewOrder = async (iData: any) => {
  const { data } = await axiosInstance.post(`application/initiate`, iData);

  return data;
};

export const updateOrderPaymentStatus = async (orderId: string) => {
  // console.log(iData);

  const { data } = await axiosInstance.patch(
    `application/${orderId}/payment/confirm`
  );

  return data;
};

// Bookings
export const getCurrentDayOrderBookingSlots = async ({
  orderId,
  dt,
}: {
  orderId: string;
  dt?: string;
}) => {
  // Construct the base URL
  let url = `application/${orderId}/schedules`;

  if (dt) {
    url += `?dt=${encodeURIComponent(dt)}`;
  }

  const { data } = await axiosInstance.get(url);

  return data;
};

export const createOrderBookingSlot = async ({
  orderId,
  schedule,
  slot,
  appointmentDate,
}: {
  orderId: string;
  schedule: string;
  slot: string;
  appointmentDate: string;
}) => {
  const { data } = await axiosInstance.post(
    `application/${orderId}/schedules`,
    {
      orderId,
      schedule,
      slot,
      appointmentDate,
    }
  );

  return data;
};

// ADMIN
export const getAdminPackages = async () => {
  const { data } = await axiosInstance.get(`packages`);

  return data;
};

// PAYMENT
export const initiatePayment = async (iData: { orderId: string }) => {
  const { data } = await axiosInstance.post(`payment/intent`, {
    ...iData,
  });

  return data;
};

// USER MANAGEMENT
export const updateUserProfile = async (userData: any) => {
  const { data } = await axiosInstance.patch("/users/me/profile", userData);

  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get("/users/me");

  return data;
};

export const changeProfileDp = async (formData: any) => {
  const { data } = await axiosInstance.post("/users/me/profile/dp", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// DEVICES
export const addDevice = async (formData: FormData) => {
  const { data } = await axiosInstance.post("/devices", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const dispatchDevice = async (input: IDispatchData) => {
  const newInput = {
    ...input,
    workingPeriod: `${formatNumber(input.workingPeriod.hh)}:${formatNumber(
      input.workingPeriod.mm
    )}`,
  };

  const { data } = await axiosInstance.post("/devices/dispatch", newInput);

  return data;
};

export const getUserDevices = async (limit: number = 5, page: number = 1) => {
  const queryParams = new URLSearchParams();
  queryParams.append("limit", limit.toString());
  queryParams.append("page", page.toString());

  const url = `/devices/user-devices?${queryParams.toString()}`;

  const { data } = await axiosInstance.get(url);

  return data;
};

export const deviceMetaData = async () => {
  const { data } = await axiosInstance.get("applications/metadata");

  return data;
};

export const getDispatchedDevices = async (
  limit: number = 20,
  page: number = 1,
  status?: string
) => {
  const queryParams = new URLSearchParams();
  queryParams.append("limit", limit.toString());
  queryParams.append("page", page.toString());

  if (status) {
    queryParams.append("status", status.toString());
  }

  const url = `/devices/dispatch?${queryParams.toString()}`;
  const { data } = await axiosInstance.get(url);

  return data;
};

//Reviews
export const getPackagesReviews = async ({ packageId }: { packageId: string }) => {
  const { data } = await axiosInstance.get(`/packages/${packageId}/reviews`);
  return data;
};

export const addReview = async (formData: IAddReview) => {
  const { data } = await axiosInstance.post("packages/review", formData );

  return data;
};

