import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import VideoController from '../../controllers/VideoController';

const initialState = {
  like: ['Nothing'],
  likesCount: 0,
  dislikesCount: 0,
};

export const reactionHandler = createAsyncThunk(
  'reaction/reactionCountHandler',
  async (videoId, { dispatch }) => {
    const result = await VideoController.getLikes(videoId);
    dispatch(setLikesCount(result));
  }
);

export const reactionSlice = createSlice({
  name: 'reaction',
  initialState,
  reducers: {
    setReaction: (state, { payload }) => {
      state.like = [...state.like, payload];
    },
    setLikesCount: (state, { payload }) => {
      state.likesCount = payload.likesCount;
      state.dislikesCount = payload.dislikesCount;
    },
    // setDislikesCount: (state, { payload }) => {
    //   state.dislikesCount = payload.dislikesCount;
    // },
  },
});

export const { setReaction, setLikesCount, setDislikesCount } =
  reactionSlice.actions;
export default reactionSlice.reducer;
