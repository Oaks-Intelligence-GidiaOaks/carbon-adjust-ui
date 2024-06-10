import axiosInstance from "@/api/axiosInstance";

export const fetchUsersRegistration = async (accountType?: string) => {
  // if(accountType === "Home Occupants/Owners") {
  //     return
  // }

  let route = "/users";

  if (accountType) {
    route = `/users?type=${accountType}&page&limit`;
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
