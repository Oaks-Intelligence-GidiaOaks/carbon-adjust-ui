import { IProduct } from "@/interfaces/product.interface";
import { createSlice } from "@reduxjs/toolkit";

// interface IProduct {}
const initialState: IProduct = {
  _id: "",
  title: "",
  attachments: [],
  owner:  {
    name: "",
    _id: "",
  },
  category: {
    name: "",
    slug: "",
  },
  color: [],
  regions: [],
  country: "",
  status: "",
  packageType: "",
  price: 0,
  discount: 0,
  hasQuestion: false,
  hasSchedule: false,
  allowPartPayment: false,
  currency: "",
  description: "",
  questions: [],
  createdAt: "",
  updatedAt: "",
  isMerchant: false,
  __v: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (_, action) => {
      return action.payload;
    },
    clearProduct: () => {
      return initialState;
    },
  },
});

export const { addProduct, clearProduct } = productSlice.actions;

export default productSlice.reducer;
