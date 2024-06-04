import axiosInstance from "@/api/axiosInstance";

export const getHIASpecializations = async () => {
  return axiosInstance.get(`/specializations/hia`);
};

export const getHIASubcontractors = async () => {
  return axiosInstance.get(`/users/hia/subcontractors`);
};

export const addSpecializationService = async (name: string) => {
  return axiosInstance.post(`/specializations`, { name });
};

export const inviteSubcontractorService = async (data: object) => {
  return axiosInstance.post(`/users/subcontractor/invite`, data);
};
