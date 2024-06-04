import { AuthUserProfile } from "@/types/general";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: AuthUserProfile | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUser(state, action: PayloadAction<UserState["user"]>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setUserDocs(state, action: PayloadAction<string | null>) {
      if (state.user) {
        state.user.doc = action.payload;
      }
    },
    // logOutUser(state) {
    //   state = initialState;
    // },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  setToken,
  setUserDocs,
  // logOutUser,
} = userSlice.actions;

export default userSlice.reducer;
