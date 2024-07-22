import { IAds } from "@/interfaces/ads.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Omit<IAds, "file"> & { bannerImage: string } = {
  bannerImage: "",
  title: "",
  description: "",
  hasCTA: false,
  ctaLink: "",
  ctaText: "",
  exposureTime: "",
  expirationDuration: "",
  showBannerImgOnly: false,
};

const adSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    pushAdMetaData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearAd: () => {
      return initialState;
    },
  },
});

export const { clearAd, pushAdMetaData } = adSlice.actions;

export default adSlice.reducer;
