import { IAsset, IDispatchData } from "@/interfaces/device.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAsset = {
  device: {
    deviceId: "",
    dispatchWindow: 4,
    startTime: "00:00",
    workingPeriod: {
      hh: 1,
      mm: 0,
    },
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
    timeChanged: (state, action: PayloadAction<{ [key: string]: number }>) => {
      state.device = {
        ...state.device,
        workingPeriod: {
          ...state.device.workingPeriod,
          ...action.payload,
        },
      };
    },
    clearDevice: (state) => {
      state.device = initialState.device;
    },
  },
});

export const { deviceChanged, timeChanged, clearDevice } = assetSlice.actions;
export default assetSlice.reducer;
