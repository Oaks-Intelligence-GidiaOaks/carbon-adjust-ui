import axiosInstance from "@/api/axiosInstance";
import { IDispatchData } from "@/interfaces/device.interface";
import { IAddReview } from "@/interfaces/product.interface";
import { WalletType } from "@/interfaces/transaction.interface";
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
export const getHoOrders = async (limit: number = 30, page: number = 1) => {
  const queryParams = new URLSearchParams();

  queryParams.append("limit", limit.toString());
  queryParams.append("page", page.toString());

  const url = `application/orders?${queryParams.toString()}`;

  const { data } = await axiosInstance.get(url);

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
  const { data } = await axiosInstance.get("/applications/metadata");

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

export const cancelDeviceSchedule = async (deviceId: string) => {
  const { data } = await axiosInstance.patch(
    `/devices/cancel-schedule/${deviceId}`
  );

  return data;
};

export const deleteDevice = async (deviceId: string) => {
  const { data } = await axiosInstance.delete(`/devices/${deviceId}`);

  return data;
};

//REVIEWS
export const getPackagesReviews = async ({
  packageId,
}: {
  packageId: string;
}) => {
  const { data } = await axiosInstance.get(`/packages/${packageId}/reviews`);
  return data;
};

export const addReview = async (formData: IAddReview) => {
  const { data } = await axiosInstance.post("packages/review", formData);

  return data;
};

//ACCEPT GRANT
export const acceptGrant = async (applicationId: string) => {
  const { data } = await axiosInstance.put("application/accept", {
    applicationId,
  });
  return data;
};

//REJECT GRANT
export const rejectGrant = async (applicationId: string) => {
  const { data } = await axiosInstance.put("application/decline", {
    applicationId,
  });
  return data;
};

//CANCEL GRANT APPLICATION
export const cancelApplication = async (applicationId: string) => {
  const { data } = await axiosInstance.put("/application/cancel", {
    applicationId,
  });
  return data;
};

//GET SUBPACKAGES
export const getGrantSubCategory = async ({
  packageId,
}: {
  packageId: string;
}) => {
  const { data } = await axiosInstance.get(
    `application/marketplace/${packageId}`
  );
  return data;
};

export const getBuildingData = async (limit: number = 5, page: number = 1) => {
  const queryParams = new URLSearchParams();
  queryParams.append("limit", limit.toString());
  queryParams.append("page", page.toString());

  const url = `/building?${queryParams.toString()}`;

  const { data } = await axiosInstance.get(url);

  return data;
};

// GET UPLOADED BUILDINGS DATA
export const uploadBuildingData = async (formData: FormData) => {
  const { data } = await axiosInstance.post(`/building/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

//UPLOAD BUILDING IMAGE
export const uploadBuildingImage = async (
  buildingId: string,
  formData: FormData
) => {
  const { data } = await axiosInstance.put(
    `/building/${buildingId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

//RESTRICTED CARDS
export const getRestrictedWallet = async (
  walletType: WalletType = WalletType.CARBON_CREDIT
) => {
  const { data } = await axiosInstance.get(
    `wallet/info?walletType=${walletType}`
  );
  return data;
};
//UPLOAD ENERGY biLLS
export const uploadEnergyBills = async (
  buildingId: string,
  formData: FormData
) => {
  const { data } = await axiosInstance.put(
    `/building/${buildingId}/energy-bills`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

//TRANSPORT
export const getTransports = async (searchQuery: string) => {
  const url = `/transportation?search=${encodeURIComponent(searchQuery)}`;
  const { data } = await axiosInstance.get(url);
  return data;
};

export const addTransport = async (formData: FormData) => {
  const { data } = await axiosInstance.post("/transportation", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getSuggestions = async (query: string) => {
  const requestUrl = import.meta.env.VITE_GEO_CODE_URL.replace(
    "{query}",
    encodeURIComponent(query)
  )
    .replace("{language}", "en-US")
    .replace("{subKey}", import.meta.env.VITE_AZURE_KEY);

  const { data } = await axiosInstance.get(requestUrl);

  return data.results;
};

export const Optimize = async (formData: FormData) => {
  const { data } = await axiosInstance.post(
    "/transportation/optimize-trip",
    formData
  );

  return data;
};

export const getTransportsHistory = async (
  searchQuery: string,
  ids: string
) => {
  const url = `/transportation/travel-history?search=${encodeURIComponent(
    searchQuery
  )}&ids=${encodeURIComponent(ids)}`;
  const { data } = await axiosInstance.get(url);
  return data;
};

export const getOptimizeChart = async (transportationIds: any[]) => {
  const payload = { transportationIds: transportationIds };
  const { data } = await axiosInstance.post(
    "/transportation/analytics",
    payload
  );
  return data;
};

//GET ENERGY BILLS
export const getEnergyBills = async (buildingId: string) => {
  const { data } = await axiosInstance.get(
    `/building/${buildingId}/energy-bills`
  );
  return data;
};

// DELETE ENERGY BILLS
export const deleteEnergyBill = async (
  buildingId: string,
  energyBillsId: string
) => {
  const { data } = await axiosInstance.delete(
    `/building/${buildingId}/energy-bills/${energyBillsId}`
  );
  return data;
};

//GET ENERGY CHART
export const getEnergyChart = async (buildingIds: string[]) => {
  const { data } = await axiosInstance.post(`/building/chart-ids`, {
    building_ids: buildingIds,
  });
  return data;
};

//LINK A DEVICE
export const linkDevice = async (buildingId: string, deviceIds: string[]) => {
  const { data } = await axiosInstance.put(
    `building/${buildingId}/add-devices`,
    {
      devices: deviceIds,
    }
  );
  return data;
};

// GET UPLOADED PURCHASES DATA
export const uploadPurchasesData = async (formData: FormData) => {
  const { data } = await axiosInstance.post(`/purchase/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// GET PURCHASES DATA
export const getPurchasesData = async (limit: number = 5, page: number = 1) => {
  const queryParams = new URLSearchParams();
  queryParams.append("limit", limit.toString());
  queryParams.append("page", page.toString());

  const url = `/purchase?${queryParams.toString()}`;

  const { data } = await axiosInstance.get(url);

  return data;
};

//GET PURCHASES CHART
export const getPurchasesChart = async (purchaseIds: string[]) => {
  const { data } = await axiosInstance.post(`/purchase/chats-response`, {
    purchase_ids: purchaseIds,
  });
  return data;
};

// WALLET
export const movePointToCash = async (coinAmount: number) => {
  const { data } = await axiosInstance.post(`/wallet/convert-coins-to-rcmbs`, {
    coinAmount,
  });

  return data;
};

export const sendOtpRcmb = async (arg: {
  receiverWalletAddress: string;
  amount: number;
}) => {
  const { data } = await axiosInstance.post(`/wallet/send-otp-rcmbs`, arg);

  return data;
};

export const sendOtpCoins = async (arg: {
  receiverWalletAddress: string;
  amount: number;
}) => {
  const { data } = await axiosInstance.post(`/wallet/send-otp-coins`, arg);

  return data;
};

export const verifyTransferRcmb = async (otp: string) => {
  const { data } = await axiosInstance.post(`/wallet/verify-transfer-rcmbs`, {
    otp,
  });

  return data;
};

export const verifyTransferCoins = async (otp: string) => {
  const { data } = await axiosInstance.post(`/wallet/verify-transfer-coins`, {
    otp,
  });

  return data;
};
