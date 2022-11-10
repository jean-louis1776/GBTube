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
} from '../components';
import EditItemInfo from '../components/edit-item-info/edit-item-info';

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
        <Route path="/userProfile/:id" element={<UserProfile />} />
        <Route path="/channel/:channelId" element={<ChannelCard />} />
        <Route path="/video/:videoId" element={<VideoCard />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/library" element={<Library />} />
        <Route path="/history" element={<History />} />
        <Route
          path="/edit-item"
          element={
            <EditItemInfo
              elemType="channel"
              oldTitle="some title"
              oldDescription="desc"
            />
          }
        />
        <Route path="/404NotFound" element={<NotFound />} />
        <Route path="/emailConfirm" element={<EmailConfirm />} />
      </Routes>
    </Box>
  );
}
export default App;
