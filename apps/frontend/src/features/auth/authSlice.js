import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthController from '../../controllers/AuthController';

const initialState = {
  // user: {
  //   email: '',
  //   password: '',
  //   name: '', // результат функции генерации имени
  // },
  isAuth: false,
};

// export const loginHandler = createAsyncThunk(
//   'auth/loginHandler',
//   async (userData, { rejectWithValue, dispatch }) => {}
// );

// export const registrationHandler = createAsyncThunk(
//   'auth/registrationHandler',
//   async (userData, { rejectWithValue, dispatch }) => {}
// );

// export const logoutHandler = createAsyncThunk(
//   'auth/logoutHandler',
//   async (userData, { rejectWithValue, dispatch }) => {}
// );

export const loginHandler = createAsyncThunk(
  'auth/loginHandler',
  async (loginData, { dispatch }) => {
    try {
      const { email, password } = loginData;
      const { data } = await AuthController.login(email, password);
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
      const { username, email, password } = regData;
      const { data } = await AuthController.registration(
        username,
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
    // login: (state, action) => {},
    setAuth: (state, { payload }) => {
      state.isAuth = payload;
    },
  },
  // extraReducers: {
  //   [loginHandler.fulfilled]: () => console.log('login: fulfilled'),
  //   [loginHandler.pending]: () => console.log('login: pending'),
  //   [loginHandler.rejected]: () => console.log('login: rejected'),
  //   [registrationHandler.pending]: () => console.log('registration: pending'),
  //   [registrationHandler.pending]: () => console.log('registration: pending'),
  //   [registrationHandler.pending]: () => console.log('registration: pending'),
  //   [logoutHandler.pending]: () => console.log('logout: pending'),
  //   [logoutHandler.pending]: () => console.log('logout: pending'),
  //   [logoutHandler.pending]: () => console.log('logout: pending'),
  // },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
