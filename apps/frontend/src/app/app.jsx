import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { checkAuthHandler } from '../features/auth/authSlice';
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
import UserPage from '../components/UserPage/UserPage';
import UserAbout from '../components/UserPage/UserAbout';
import AuthController from '../controllers/AuthController';
import {
  setAccessToken,
  setAuthStatus,
  setId,
  setNickName, setRole
} from '../store/slice';

export function App() {
  const dispatch = useDispatch();

  const runOnceBuild = () => {
    let runOnceFlag = true;
    const setFlagToTrue = () => {
      runOnceFlag = true;
      console.log('Auth flag dropped');
    };
    return () => {
      const handle = async () => {
        console.log('useEffect run');
        if (runOnceFlag && localStorage.getItem('token')) {
          console.log('Auth running');
          const { isBaned, accessToken, id, nickName, role } = await AuthController.checkAuth();
          if (isBaned) {
            localStorage.setItem('token', '');
            console.log(data, 'user banned');
            dispatch(setAuthStatus(false));
            dispatch(setAccessToken(''));
            dispatch(setId(''));
            dispatch(setNickName(''));
            dispatch(setRole(''));
            return;
          }
          localStorage.setItem('token', accessToken);
          dispatch(setAuthStatus(true));
          dispatch(setAccessToken(accessToken));
          dispatch(setId(String(id)));
          dispatch(setNickName(nickName));
          dispatch(setRole(role));
          runOnceFlag = false;
          setTimeout(setFlagToTrue, 3000);
        }
      };
      handle()
        .then(() => {
          console.log('User update successful');
        })
        .catch((err) => {
          console.log('User update failed');
          console.log(err);
        });
    };
  };

  const runOnceInstance = runOnceBuild();

  useEffect(runOnceInstance, []);
  return (
    <Box sx={{ bgcolor: 'darkBackground.main' }}>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/userProfile/:user_id" element={<UserProfile />} />
        <Route path="/channel/:channelId" element={<ChannelCard />} />
        <Route path="/video/:videoId" element={<VideoCard />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/library" element={<Library />} />
        <Route path="/history" element={<History />} />
        <Route
          path={`/${CHANNEL}/get_all/:user_id`}
          element={<ChannelGrid />}
        />
        <Route
          path={`/${PLAYLIST}/get_all/:idList`}
          element={<PlayListGrid />}
        />
        <Route
          path={`/${VIDEO}/get_all/:idList`}
          element={<VideoGrid childrenType={VIDEO} />}
        />
        <Route path={`/${CHANNEL}/get_one/:id`} element={<ChannelGrid />} />
        <Route path={`/${PLAYLIST}/get_one/:id`} element={<PlayListGrid />} />
        <Route path={`/${VIDEO}/get_one/:idList`} element={<VideoDetail />} />
        <Route
          path={`/${CHANNEL}/create/:idList`}
          element={
            <EditItemInfo
              elemType={CHANNEL}
              sendData={EditItemController.addItem}
            />
          }
        />
        <Route
          path={`/${PLAYLIST}/create/:idList`}
          element={
            <EditItemInfo
              elemType={PLAYLIST}
              sendData={EditItemController.addItem}
            />
          }
        />
        <Route
          path={`/${VIDEO}/create/:idList`}
          element={<UploadVideoDraft />}
        />

        <Route path="/404NotFound" element={<NotFound />} />
        <Route path="/emailConfirm" element={<EmailConfirm />} />
        <Route path="/videoDetail" element={<VideoDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="miniVideo" element={<VideoCard />} />
        <Route path="user-channel" element={<UserPage />} />
      </Routes>
    </Box>
  );
}
export default App;
