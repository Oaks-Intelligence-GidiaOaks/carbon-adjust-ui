import axiosInstance from "@/api/axiosInstance";

export const fetchUsersRegistration = async ({
  accountType,
  page,
  limit,
}: {
  accountType?: string;
  page: number;
  limit: number;
}) => {
  // if(accountType === "Home Occupants/Owners") {
  //     return
  // }

  let route = "/users";

  const params: any = {};

  if (limit) {
    params.limit = limit;
  }
  if (page) {
    params.page = page;
  }

  if (accountType && accountType !== "ALL") {
    params.type = accountType;
  }

  const queryString = new URLSearchParams(params).toString();
  if (queryString) {
    route += `?${queryString}`;
  }

  const data = await axiosInstance.get(route);
  return data.data;
};

export const fetchAllUsers = async () => {
  // if(accountType === "Home Occupants/Owners") {
  //     return
  // }

  const { data } = await axiosInstance.get(`/users`);

  return data;
};

export const approveUserRegistration = async (id: string) => {
  const { data } = await axiosInstance.patch(`/users/review/profile`, {
    userId: id,
    status: "confirmed",
  });

  return data;
};

export const declineUserRegistration = async (id: string) => {
  const { data } = await axiosInstance.patch(`/users/review/profile`, {
    userId: id,
    status: "declined",
  });

  return data;
};

export const suspendUserRegistration = async (id: string) => {
  const { data } = await axiosInstance.patch(`/users/review/profile`, {
    userId: id,
    status: "suspended",
  });

  return data;
};

export const makeMerchantInternal = async (id: string) => {
  const { data } = await axiosInstance.patch(`/users/merchant/internal`, {
    merchantId: id,
    status: true,
  });

  return data;
};
