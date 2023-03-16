import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../services';

const initialState = {
  user: {},
  isAuthenticated: false,
  sessionId: '',
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.sessionId = '';
      localStorage.removeItem('request_token');
      localStorage.removeItem('session_id');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.sessionId = localStorage.getItem('session_id');
      })
      .addCase(loginUser.rejected, (state) => {
        state.isError = true;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice;
