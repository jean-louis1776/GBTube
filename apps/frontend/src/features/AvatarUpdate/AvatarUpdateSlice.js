import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserController from '../../controllers/UsersController';

const initialState = {
  avatarImg: {},
};

export const avatarUploadHandler = createAsyncThunk(
  'avatar/avatarUploadHandler',
  async (avatar, { dispatch }) => {
    const response = await UserController.avatarUpload(avatar);
    dispatch(uploadAvatar(avatar));
  }
);

export const avatarDeleteHandler = createAsyncThunk(
  ('avatar/avatarDeleteHandler',
  async (_, { dispatch }) => {
    const response = await UserController.deleteAvatar();
    dispatch(deleteAvatar());
  })
);

export const AvatarUpdateSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    uploadAvatar: (state, { payload }) => {
      state.avatarImg = payload;
    },
    deleteAvatar: (state) => {
      state.avatarImg = null;
    },
  },
});

export const { uploadAvatar, deleteAvatar } = AvatarUpdateSlice.actions;
export default AvatarUpdateSlice.reducer;
