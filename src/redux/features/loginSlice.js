import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addLogin: (state, action) => {
      state.login = action.payload;
    },
    deleteLogin: (state) => {
      state.login = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLogin, deleteLogin } = loginSlice.actions;

export default loginSlice.reducer;
