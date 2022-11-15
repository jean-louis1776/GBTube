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
} from '../components';
import EditItemInfo from '../components/edit-item-info/edit-item-info';
import EditItemController from '../controllers/EditItemController';
import { CHANNEL, PLAYLIST, VIDEO } from '@constants/frontend';
import VideoDetail from '../components/VideoDetail/VideoDetail';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuthHandler());
    }
  }, []);
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
        <Route path={`/${CHANNEL}/get_all/:parent_id`} element={<VideoGrid childrenType={CHANNEL} />} />
        <Route path={`/${PLAYLIST}/get_all/:parent_id`} element={<VideoGrid childrenType={PLAYLIST} />} />
        <Route path={`/${VIDEO}/get_all/:parent_id`} element={<VideoGrid childrenType={VIDEO} />} />
        <Route path={`/${CHANNEL}/get_one/:id`} element={<VideoGrid childrenType={PLAYLIST} />} />
        <Route path={`/${PLAYLIST}/get_one/:id`} element={<VideoGrid childrenType={VIDEO} />} />
        <Route path={`/${VIDEO}/get_one/:id`} element={<VideoCard />} />
        <Route
          path={`/${CHANNEL}/create`}
          element={
            <EditItemInfo
              elemType={CHANNEL}
              sendData={EditItemController.addItem}
            />
          }
        />
        <Route
          path={`/${PLAYLIST}/create`}
          element={
            <EditItemInfo
              elemType={PLAYLIST}
              sendData={EditItemController.addItem}
            />
          }
        />
        <Route path={`/${VIDEO}/create`} element={<UploadVideo />} />
        <Route path="videoDetail" element={<VideoDetail />} />
        <Route
          path="/edit-item"
          element={
            <EditItemInfo
              elemType={CHANNEL}
              idList={['123']}
              sendData={EditItemController.addItem}
            />
          }
        />
        <Route path="/404NotFound" element={<NotFound />} />
        <Route path="/emailConfirm" element={<EmailConfirm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}
export default App;
