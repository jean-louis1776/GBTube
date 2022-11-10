import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserController from '../../controllers/UsersController';

const initialState = {
  userPass: {},
};

export const userPasswordUpdate = createAsyncThunk(
  'userPassword/userPasswordUpdate',
  async (updatingPassword, { dispatch }) => {
    const response = await UserController.changePassword(updatingPassword);
    // dispatch(setPassword(response.user));
    console.log(response);
  }
);

export const userPasswordSlice = createSlice({
  name: 'userPassword',
  initialState,
  reducers: {
    setPassword: (state, { payload }) => {
      state.userPass = payload;
    },
  },
});

export const { setPassword } = userPasswordSlice.actions;
export default userPasswordSlice.reducer;
