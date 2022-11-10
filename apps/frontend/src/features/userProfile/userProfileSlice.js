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
      dispatch(setUser(response));
    } catch (error) {
      console.log(error);
    }
  }
);

export const userDataUpdate = createAsyncThunk(
  'userProfile/userDataUpdate',
  async (updatingUser, { dispatch }) => {
    try {
      const response = await UserController.updateUser(updatingUser);
      dispatch(setUser(updatingUser));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'userProfile/deleteUser',
  async (id, { dispatch }) => {
    try {
      const response = await UserController.deleteUser(id);
      dispatch(deleteUser(id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
  },
});

export const { setUser, clearUser } = userProfileSlice.actions;
export default userProfileSlice.reducer;
