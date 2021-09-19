import { createSlice } from '@reduxjs/toolkit';

import { signUp, signIn, logout, resetUser } from './auth-operations';

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  sid: null,
  isLoggedIn: false,
  isResetingUser: false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [signUp.pending](state) {
      state.loading = true;
    },
    [signUp.fulfilled](state, { payload }) {
      state.user = payload.data.email;
      state.token = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.sid = payload.sid;
      state.error = null;
      state.isLoggedIn = true;
      state.loading = false;
    },
    [signUp.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },

    [signIn.pending](state) {
      state.loading = true;
    },
    [signIn.fulfilled](state, { payload }) {
      state.user = payload.data.email;
      state.token = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.sid = payload.sid;
      state.error = null;
      state.isLoggedIn = true;
      state.loading = false;
    },
    [signIn.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

    [logout.pending](state) {
      state.loading = true;
    },
    [logout.fulfilled](state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.sid = null;
      state.error = null;
      state.isLoggedIn = false;
      state.loading = false;
    },
    [logout.rejected](state, { payload }) {
      state.error = payload;
      state.loading = false;
    },

    [resetUser.pending](state) {
      state.isResetingUser = true;
    },
    [resetUser.fulfilled](state, { payload }) {
      state.token = payload.newAccessToken;
      state.refreshToken = payload.newRefreshToken;
      state.sid = payload.newSid;
      state.error = null;
      state.isLoggedIn = true;
      state.isResetingUser = false;
    },
    [resetUser.rejected](state, { payload }) {
      state.isResetingUser = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
