import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
  },
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    editUser: (state, action) => {
      state.users = state.users.map((user) => {
        if (action.payload.id === user.id) {
          return { ...action.payload };
        }
        return user;
      });
    },
    adduser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUsers, deleteUsers, editUser, adduser } = usersSlice.actions;

export default usersSlice.reducer;
