import { IAsset, IDispatchData } from "@/interfaces/device.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAsset = {
  device: {
    deviceId: "",
    dispatchWindow: 1,
    startTime: "00:00",
    workingPeriod: "",
  },
};

const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    deviceChanged: (state, action: PayloadAction<Partial<IDispatchData>>) => {
      state.device = {
        ...state.device,
        ...action.payload,
      };
    },
    clearDevice: (state) => {
      state.device = initialState.device;
    },
  },
});

export const { deviceChanged, clearDevice } = assetSlice.actions;
export default assetSlice.reducer;
