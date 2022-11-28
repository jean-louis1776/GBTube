import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthHandler } from '../features/auth/authSlice';
import { Box } from '@mui/material';

import './app.module.scss';

import {
  ChannelCard,
  EmailConfirm,
  History,
  Library,
  Likes,
  LoginForm,
  MainPage,
  NotFound,
  SearchFeed,
  SignupForm,
  Subscriptions,
  UploadVideo,
  VideoCard,
  UserProfile,
  VideoGrid,
  PlayListGrid,
  ChannelGrid,
} from '../components';
import VideoDetail from '../components/VideoDetail/VideoDetail';
import EditItemInfo from '../components/edit-item-info/edit-item-info';
import EditItemController from '../controllers/EditItemController';
import { CHANNEL, PLAYLIST, VIDEO } from '@constants/frontend';
import UploadVideoDraft from '../components/UploadVideo/UploadVideoDraft';

export function App() {
  const dispatch = useDispatch();

  const runOnceBuild = () => {
    let runOnceFlag = true;
    const setFlagToTrue = () => {
      runOnceFlag = true;
      console.log('Auth flag dropped');
    };
    return () => {
      console.log('useEffect run');
      if (runOnceFlag && localStorage.getItem('token')) {
        console.log('Auth running');
        dispatch(checkAuthHandler());
        runOnceFlag = false;
        setTimeout(setFlagToTrue, 3000);
      }
    };
  };

  const runOnceInstance = runOnceBuild();

  useEffect(
    runOnceInstance,
    /*() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuthHandler());
    }
  }*/ []
  );
  return (
    <Box sx={{ bgcolor: 'darkBackground.main' }}>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/uploadVideo" element={<UploadVideo />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/channel/:channelId" element={<ChannelCard />} />
        <Route path="/video/:videoId" element={<VideoCard />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/library" element={<Library />} />
        <Route path="/history" element={<History />} />
        <Route path={`/${CHANNEL}/get_all/:user_id`} element={<ChannelGrid />} />
        <Route path={`/${PLAYLIST}/get_all/:idList`} element={<PlayListGrid />} />
        <Route path={`/${VIDEO}/get_all/:idList`} element={<VideoGrid childrenType={VIDEO} />} />
        <Route path={`/${CHANNEL}/get_one/:id`} element={<ChannelGrid />} />
        <Route path={`/${PLAYLIST}/get_one/:id`} element={<PlayListGrid />} />
        <Route path={`/${VIDEO}/get_one/:idList`} element={<VideoDetail />} />
        <Route path={`/${CHANNEL}/create/:idList`} element={<EditItemInfo elemType={CHANNEL} sendData={EditItemController.addItem} />} />
        <Route path={`/${PLAYLIST}/create/:idList`} element={<EditItemInfo elemType={PLAYLIST} sendData={EditItemController.addItem} />} />
        <Route path={`/${VIDEO}/create/:idList`} element={<UploadVideoDraft />} />
        <Route path="/404NotFound" element={<NotFound />} />
        <Route path="/emailConfirm" element={<EmailConfirm />} />
        <Route path="/videoDetail" element={<VideoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}
export default App;
