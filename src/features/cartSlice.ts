import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    orderIds: [], // Array to store order IDs
  },
  reducers: {
    setOrderIds: (state, action) => {
      state.orderIds = action.payload; // Update order IDs
    },
    clearOrderIds: (state) => {
      state.orderIds = []; // Clear the order IDs when necessary
    },
  },
});

export const { setOrderIds, clearOrderIds } = cartSlice.actions;

export default cartSlice.reducer;
