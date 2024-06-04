import axiosInstance from "@/api/axiosInstance";

const userService = () => {
  return {
    fetchUserInfo: () => {
      return axiosInstance.get("users/me");
    },
    fetchHomeMetaData: () => {
      return axiosInstance.get("users/housemetadata");
    },
  };
};

export default userService;
