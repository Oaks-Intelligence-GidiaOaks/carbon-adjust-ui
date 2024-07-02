import { IOrder } from "@/interfaces/orderData.interface";
// import { IQuestion } from "@/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";

// interface Props extends IOrder {}

const initialState: IOrder = {
  _id: "",
  customerAddress: {
    country: {
      label: "",
      value: "",
    },
    cityOrProvince: {
      label: "",
      value: "",
    },
    firstLineAddress: "",
    zipcode: "",
  },
  // customerEmail: "",
  customerPhone: "",
  quantity: 1,
  responses: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      state.customerAddress.firstLineAddress = action.payload;
    },
    updatePrice: (state, action) => {
      state.price = action.payload;
    },
    updatePhone: (state, action) => {
      state.customerPhone = action.payload;
    },
    updateOrderId: (state, action) => {
      state._id = action.payload;
    },
    updateCountry: (state, action) => {
      state.customerAddress.country = action.payload;
    },
    updateCity: (state, action) => {
      state.customerAddress.cityOrProvince = action.payload;
    },
    updatepPostCode: (state, action) => {
      state.customerAddress.zipcode = action.payload;
    },
    updateQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    updateResponses: (state, action) => {
      state.responses = action.payload;
    },
    clearOrder: () => {
      return initialState;
    },
  },
});

export const {
  updateOrderId,
  clearOrder,
  updateAddress,
  updatePhone,
  updatePrice,
  updateQuantity,
  updateCountry,
  updateCity,
  updatepPostCode,
  updateResponses,
} = orderSlice.actions;

export default orderSlice.reducer;
