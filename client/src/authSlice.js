import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userId: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.logoImage = action.payload.logoImage;
      state.description = action.payload.description;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.username = null;
      state.logoImage = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
