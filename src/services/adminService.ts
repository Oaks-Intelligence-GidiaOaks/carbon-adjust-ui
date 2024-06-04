import axiosInstance from "@/api/axiosInstance";

export const fetchUsersRegistration = async (accountType: string) => {
  // if(accountType === "Home Occupants/Owners") {
  //     return
  // }
  return axiosInstance.get(`/users?type=${accountType}&page&limit`);
};

export const fetchAllUsers = async () => {
  // if(accountType === "Home Occupants/Owners") {
  //     return
  // }
  return axiosInstance.get(`/users`);
};
