import axiosInstance from "@/api/axiosInstance";

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

// PAYMENT
export const initiatePayment = async (iData: { orderId: string }) => {
  const { data } = await axiosInstance.post(`payment/intent`, {
    ...iData,
  });

  console.log(data);

  return data;
};
