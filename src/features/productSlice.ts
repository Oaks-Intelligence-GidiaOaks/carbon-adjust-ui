import { AuthUserProfile } from "@/types/general";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserState {
//   user: AuthUserProfile | null;
//   token: string | null;
//   isLoading: boolean;
//   error: string | null;
// }

const initialState = {
  product: null,
  //   step: 0,
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
