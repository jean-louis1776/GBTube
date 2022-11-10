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
<<<<<<< HEAD:apps/frontend/src/features/userProfile/userProfileSlice.js
      const response = await UserController.getUsers();
=======
      const response = await UserController.getUserById(
        'http://localhost:3333/api/user/find/:id'
      );
>>>>>>> 358c026c14aab39f6c2f930ba5c25b98a388b0c5:apps/frontend/src/features/userProfile/userProfile.js
      dispatch(setUser(response.user));
    } catch (error) {
      console.log(error);
    }
  }
);

export const userDataUpdate = createAsyncThunk(
  'userProfile/userDataUpdate',
  async (updatingUser, { dispatch }) => {
    try {
<<<<<<< HEAD:apps/frontend/src/features/userProfile/userProfileSlice.js
      const response = await UserController.updateUser(updatingUser);
      dispatch(setUser(updatingUser));
      console.log(response);
=======
      const response = await UserController.updateUser(userForm);
      dispatch(setUser(response.user));
>>>>>>> 358c026c14aab39f6c2f930ba5c25b98a388b0c5:apps/frontend/src/features/userProfile/userProfile.js
    } catch (error) {
      console.log(error);
    }
  }
);

<<<<<<< HEAD:apps/frontend/src/features/userProfile/userProfileSlice.js
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
=======
export const userPasswordUpdate = createAsyncThunk(
  'userProfile/userPasswordUpdate',
  async (passwordForm, { dispatch }) => {
    const response = await UserController.changePassword(passwordForm);
    dispatch(setPassword(response.user));
>>>>>>> 358c026c14aab39f6c2f930ba5c25b98a388b0c5:apps/frontend/src/features/userProfile/userProfile.js
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
