import { createSlice } from "@reduxjs/toolkit";

interface IProduct {
  product: any;
}

const initialState: IProduct = {
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
