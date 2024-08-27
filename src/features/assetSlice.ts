import { IAsset } from "@/interfaces/device.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAsset = {
  device: {
    id: "",
  },
};

const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setDeviceId: (_, action: PayloadAction<string>) => {
      return {
        ...initialState,
        device: {
          ...initialState.device,
          id: action.payload,
        },
      };
    },
  },
});

export const { setDeviceId } = assetSlice.actions;
export default assetSlice.reducer;
