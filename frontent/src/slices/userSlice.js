import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
          state.loading = true;
        },
        signInSuccess: (state, action) => {
          state.currentUser = action.payload;
          state.loading = false;
          state.error = null;
        },
        signInFailure: (state, action) => {
          state.error = action.payload;
          state.loading = false;
        },
        updateUserStart: (state) => {
          state.loading = true;
        },
        updateUserSuccess: (state, action) => {
          state.currentUser = action.payload;
          state.loading = false;
          state.error = null;
        },
        updateUserFailure: (state, action) => {
          state.error = action.payload;
          state.loading = false;
        },
        deleteUserFailure: (state, action) => {
          state.error = action.payload;
          state.loading = false;
        },
        deleteUserStart: (state) => {
          state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
          state.currentUser = action.payload;
          state.loading = false;
          state.error = null;
        },
        signOutUserFailure: (state, action) => {
          state.error = action.payload;
          state.loading = false;
        },
        signOutUserStart: (state) => {
          state.loading = true;
        },
        signOutUserSuccess: (state, action) => {
          state.currentUser = action.payload;
          state.loading = false;
          state.error = null;
        },

    }
})
export const {signInStart,signInSuccess,signInFailure, updateUserFailure, updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserFailure,signOutUserStart,signOutUserSuccess } = userSlice.actions;
export default userSlice.reducer;
