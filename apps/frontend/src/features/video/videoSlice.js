import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import VideoController from '../../controllers/VideoController';

const initialState = {
  video: {},
};

export const uploadVideo = createAsyncThunk(
  'video/uploadVideo',
  async (userVideo, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await VideoController.addVideo(userVideo);
      dispatch(setVideo(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const getVideoById = createAsyncThunk(
  'video/getServerVideo',
  async (videoId, { rejectWithValue, dispatch }) => {
    const video = await VideoController.getVideobyId(videoId);
    dispatch(getVideo(video));
  }
);

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideo: (state, { payload }) => {
      state.video = payload;
    },
    getVideo: (state, { payload }) => {
      state.video = payload;
    },
  },
});

export const { setVideo, getVideo } = videoSlice.actions;
export default videoSlice.reducer;
