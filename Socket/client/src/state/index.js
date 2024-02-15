import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "dark",
  user: null,
  token: null,
  socket: null,
};

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setSocket: (state) => {
      state.socket = state.socket;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.services = [];
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setSocket
} = authState.actions;
export default authState.reducer;
