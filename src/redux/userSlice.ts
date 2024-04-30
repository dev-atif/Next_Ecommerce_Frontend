import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";



const initialState = {
  user: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user= action.payload
      console.log('redux console',action.payload);
    },
  },
});

export const {setUserDetails}= UserSlice.actions
export const getUser = (state: RootState) => state.user.user
export default UserSlice.reducer