import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserController from '../../controllers/UsersController';

const initialState = {
  user: {
    nickName: 'Niklas',
    email: 'niklas.buk@gmail.com',
  },
};

export const getUserData = createAsyncThunk(
  'userProfile/getUserData',
  async (_, { dispatch }) => {
    try {
      const response = await UserController.getUserById(
        'http://localhost:3333/api/user/find/:id'
      );
      dispatch(setUser(response.user));
    } catch (error) {
      console.log(error);
    }
  }
);

export const userDataUpdate = createAsyncThunk(
  'userProfile/userDataUpdate',
  async (userForm, { dispatch }) => {
    try {
      const response = await UserController.updateUser(userForm);
      dispatch(setUser(response.user));
    } catch (error) {
      console.log(error);
    }
  }
);

export const userPasswordUpdate = createAsyncThunk(
  'userProfile/userPasswordUpdate',
  async (passwordForm, { dispatch }) => {
    const response = await UserController.changePassword(passwordForm);
    dispatch(setPassword(response.user));
  }
);

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    clearUser: (state) => {
      state.user = {};
    },
    deleteUser: (state) => {
      state.user = null;
    },
    setPassword: (state, { payload }) => {
      console.log((state.user.password = payload));
    },
  },
});

export const { setUser, clearUser, setPassword } = userProfileSlice.actions;
export default userProfileSlice.reducer;
