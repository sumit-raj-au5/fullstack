import {createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState:{
    value:null
  },

  reducers:{
    // two functions for login and logout
    login:(state, action) => {
      state.user = action.payload
    },

    logout:(state, action) => {
      state.user = null
    }
  }
})

//exporting login and logout function using .action
export const {login, logout} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
