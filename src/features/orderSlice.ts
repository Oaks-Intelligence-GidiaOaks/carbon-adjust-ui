import { IOrder } from "@/interfaces/orderData.interface";
import { IQuestion } from "@/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";

interface Props extends IOrder {
  //   questions: IQuestion[];
}

const initialState: Props = {
  customerAddress: "",
  customerEmail: "",
  customerPhone: "",
  package: "",
  price: 0,
  responses: [],
  requiredExtraProd: true,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrderDetails: (state, action) => {
      state = action.payload;
    },
    updateAddress: (state, action) => {
      state.customerAddress = action.payload;
    },
    updateEmail: (state, action) => {
      state.customerEmail = action.payload;
    },
    updatePhone: (state, action) => {
      state.customerPhone = action.payload;
    },
    updateResponses: (state, action) => {
      state.responses.push(action.payload);
    },
    clearOrder: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  updateOrderDetails,
  clearOrder,
  updateAddress,
  updatePhone,
  updateEmail,
  updateResponses,
} = orderSlice.actions;

export default orderSlice.reducer;
