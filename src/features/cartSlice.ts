import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
  orderIds: string[];
}

const initialState: CheckoutState = {
  orderIds: [],
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setOrderIds(state, action: PayloadAction<string[]>) {
      state.orderIds = action.payload;
    },
  },
});

export const { setOrderIds } = checkoutSlice.actions;
export default checkoutSlice.reducer;
