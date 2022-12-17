import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/loginSlice";
import usersReducer from "./features/usersSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
  },
});
