import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthController from '../../controllers/AuthController';
import { setUser } from '../userProfile/userProfileSlice';

const initialState = {
  isAuth: false,
};

export const loginHandler = createAsyncThunk(
  'auth/loginHandler',
  async (loginData, { dispatch }) => {
    try {
      const { email, password } = loginData;
      const { data } = await AuthController.login(email, password);
      dispatch(setUser(data));
      localStorage.setItem('token', data.accessToken);
      console.log(localStorage);
      dispatch(setAuth(true));
    } catch (error) {
      console.log(error);
    }
  }
);

export const registrationHandler = createAsyncThunk(
  'auth/registrationHandler',
  async (regData, { dispatch }) => {
    try {
      const { nickName, email, password } = regData;
      const { data } = await AuthController.registration(
        nickName,
        email,
        password
      );
      localStorage.setItem('token', data.accessToken);
      dispatch(setAuth(true));
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutHandler = createAsyncThunk(
  'auth/logoutHandler',
  async (_, { dispatch }) => {
    try {
      await AuthController.logout();
      localStorage.removeItem('token');
      dispatch(setAuth(false));
    } catch (error) {
      console.log(error);
    }
  }
);

export const checkAuthHandler = createAsyncThunk(
  'auth/checkAuthHandler',
  async (_, { dispatch }) => {
    try {
      const { data } = await AuthController.checkAuth();
      localStorage.setItem('token', data.accessToken);
      dispatch(setAuth(true));
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.isAuth = payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
