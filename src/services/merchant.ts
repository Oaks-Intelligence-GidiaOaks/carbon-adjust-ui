import axiosInstance from "@/api/axiosInstance";

export const getPackageCategories = () => {
  return axiosInstance.get("/packages/categories");
};

export const getRecentPackagesQuery = () => {
  return axiosInstance.get("/packages/recent");
};

export const getScheduleSlots = (id: string) => {
  return axiosInstance.get(`/packages/${id}/schedules`);
};

export const getAllStaff = () => {
  return axiosInstance.get(`/users/staffs`);
};

export const createPackageQuery = (data: FormData) => {
  return axiosInstance.post("/packages", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePackageQuery = (data: FormData, packageId: string) => {
  return axiosInstance.patch(
    `/packages/${packageId}`,
    data
    // , {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
  );
};

export const sendQuoteQuery = async (id: any, quoteData: FormData) => {
  const { data } = await axiosInstance.patch(
    `/application/${id}/quote`,
    quoteData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const sendActivityQuery = async (
  id: any,
  iData: {
    activityId: string;
    status: string;
  }
) => {
  const { data } = await axiosInstance.patch(
    `/application/${id}/activity`,
    iData
  );

  return data;
};

export const completeApplication = async (packageId: string) => {
  const { data } = await axiosInstance.patch(
    `/application/${packageId}/complete`
  );

  return data;
};

export const generateSlotQuery = (data: {
  schedules: {
    startTime: string;
    endTime: string;
    slotDuration: string;
    day: string;
  }[];
  packageId: string;
}) => {
  return axiosInstance.post("/booking/schedule/generate-slot", {
    schedules: data.schedules,
    packageId: data.packageId,
  });
};

export const assignApplicationsToStaffQuery = (data: {
  applications: string[];
  assignee: string;
}) => {
  return axiosInstance.post("/application/assign", data);
};

export const updatePackageImage = (data: FormData, packageId: string) => {
  return axiosInstance.patch(`/packages/${packageId}/file/edit`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const activateSlotQuery = (
  data: { schedule: string; slots: string[] }[]
) => {
  return axiosInstance.patch("/booking/schedule/activate-slot", {
    schedules: data,
  });
};

export const addStaff = (data: {
  firstName: string;
  surname: string;
  email: string;
  accessLevel: string;
}) => {
  return axiosInstance.post(`/users/staffs`, data);
};
