import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import VideoController from '../../controllers/VideoController';

const initialState = {
  // video: {},
  video: {
    frameShot: null,
    title: 'Нева гона гив ю ап',
    channelName: 'Some User Channel',
    nickName: 'Niklas',
    viewsCount: 100500,
    createdTimestamp: new Date(),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores blanditiis cum cupiditate dolorem doloremque eligendi eveniet facilis fuga illum in inventore ipsa iure, laboriosam laudantium libero minus nihil nobis nostrum odit officia perspiciatis quasi quia quibusdam quisquam quos ratione repellendus sed sint sit tempora unde voluptates voluptatum! Ipsam, iure.',
  },
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
    console.log('VIDEO', video);
    dispatch(getVideo(video));
  }
);

export const getVideoFrameShot = createAsyncThunk(
  'video/getVideoFrameShot',
  async (videoId, { dispatch }) => {
    const frame = await VideoController.getFrameShotVideo(videoId);
    dispatch(getVideoFrameShot(frame));
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
    getVideoFrameShot: (state, { payload }) => {
      state.video.frameShot = payload;
    },
  },
});

export const { setVideo, getVideo } = videoSlice.actions;
export default videoSlice.reducer;
