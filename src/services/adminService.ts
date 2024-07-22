import axiosInstance from "@/api/axiosInstance";
import { IAds } from "@/interfaces/ads.interface";

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

// ADMIN ADVERTS

export const createAd = async (adData: {
  title: string;
  description: string;
  hasCTA: boolean;
  ctaLink?: string;
  exposureTime: string;
  expirationDuration: string;
  showBannerImgOnly: boolean;
  file: File | null;
}) => {
  const { data } = await axiosInstance.post(`/adverts`, adData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getAllAds = async () => {
  const { data } = await axiosInstance.get(`/adverts`);

  return data;
};

export const getFeaturedAds = async () => {
  const { data } = await axiosInstance.get(`/adverts/featured`);
  return data;
};

export const getHeroAds = async () => {
  const { data } = await axiosInstance.get(`/adverts/hero`);
  return data;
};

enum LocationEnum {
  FEATURED = "FEATURED",
  HERO = "HERO",
}

export const publishAdsToLocation = async (adsData: {
  location: string;
  adverts: string[];
}) => {
  const { data } = await axiosInstance.patch(`/adverts/publish`, adsData);
  return data;
};

export const unPublishAdsFromLocation = async (adsId: string) => {
  const { data } = await axiosInstance.patch(`/adverts/${adsId}/unpublish`);
  return data;
};

export const pubishAdsToDefault = async (adsData: {
  location: LocationEnum;
  adverts: string[];
}) => {
  const { data } = await axiosInstance.patch(`/adverts/make/default`, adsData);

  return data;
};

export const unPubishAdsFromDefault = async (adsId: string) => {
  const { data } = await axiosInstance.patch(
    `/adverts/${adsId}/override/default`
  );

  return data;
};

export const editAdvertResponse = async (adsData: {
  adsId: string;
  data: Partial<IAds>;
}) => {
  const { data } = await axiosInstance.patch(
    `/adverts/${adsData.adsId}`,
    adsData.data
  );

  return data;
};

export const updateAdvertBanner = async (adsData: {
  adsId: string;
  file: File;
}) => {
  const { data } = await axiosInstance.patch(
    `/adverts/${adsData.adsId}/file/upload`,
    { file: adsData.file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};