import { IOrder } from "@/interfaces/orderData.interface";
// import { IQuestion } from "@/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";

interface Props extends IOrder {
  //   questions: IQuestion[];
}

const initialState: Props = {
  _id: "",
  customerAddress: "",
  customerEmail: "",
  customerPhone: "",
  quantity: 1,
  // price: 0,
  responses: [],
  // requiredExtraProd: true,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // updateOrderDetails: (state, action) => {
    //   state = action.payload;
    // },
    updateAddress: (state, action) => {
      state.customerAddress = action.payload;
    },
    updateEmail: (state, action) => {
      state.customerEmail = action.payload;
    },
    updatePhone: (state, action) => {
      state.customerPhone = action.payload;
    },
    updateOrderId: (state, action) => {
      state._id = action.payload;
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
  // updateOrderDetails,
  updateOrderId,
  clearOrder,
  updateAddress,
  updatePhone,
  updateEmail,
  updateQuantity,
  updateResponses,
} = orderSlice.actions;

export default orderSlice.reducer;
