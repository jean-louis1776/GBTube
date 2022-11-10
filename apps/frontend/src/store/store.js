import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../features/search/searchSlice';
import rateVideoSlice from '../features/rateVideo/rateVideoSlice';
import userChannelListSlice from '../features/userChannels/userChannelsListSlice';
import commentSlice from '../features/commentVideo/commentSlice';
import userProfileSlice from '../features/userProfile/userProfile';
import authSlice from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    search: searchSlice,
    rate: rateVideoSlice,
    channels: userChannelListSlice,
    comment: commentSlice,
    userProfile: userProfileSlice,
    auth: authSlice,
  },
});
