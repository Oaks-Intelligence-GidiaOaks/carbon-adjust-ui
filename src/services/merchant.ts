import axiosInstance from "@/api/axiosInstance";

export const getPackageCategories = () => {
  return axiosInstance.get("/packages/categories");
};

export const getRecentPackagesQuery = () => {
  return axiosInstance.get("/packages/recent");
};

export const createPackageQuery = (data: FormData) => {
  return axiosInstance.post("/packages", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const generateSlotQuery = (data: {
  startTime: string;
  endTime: string;
  slotDuration: string;
  packageId: string;
  day: string;
}) => {
  return axiosInstance.post("/booking/schedule/generate-slot", data);
};

export const activateSlotQuery = (data: {
  schedule: string;
  slots: string[];
}) => {
  return axiosInstance.patch("/booking/schedule/activate-slot", data);
};
