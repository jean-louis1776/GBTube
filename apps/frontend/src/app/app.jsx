import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
// import { getAuthDataFromLS, removeUser } from './utils/auth';
import { Box } from '@mui/material';

import './app.module.scss';

import {
  ChannelCard,
  History,
  Library,
  Likes,
  LoginForm,
  MainPage,
  SearchFeed,
  SignupForm,
  Subscriptions,
  VideoCard,
  UserProfile,
} from '../components';

export function App() {
  useEffect(() => {
    // const auth = getAuthDataFromLS();
    //
    // if (!auth || !auth.accessToken || !auth.refreshToken) {
    //   removeUser();
    //   return;
    // }
    // // здесь необходимо передавать данные об авторизации юзера
    // setAuth(true);
    // setUser(auth.user);
  }, []);
  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/channel/:channelId" element={<ChannelCard />} />
        <Route path="/video/:videoId" element={<VideoCard />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/library" element={<Library />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Box>
  );
}
export default App;
