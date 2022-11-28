import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LogoutIcon from '@mui/icons-material/Logout';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import appLogo from './assets/logo.png';
import emailConfirmLogo from './assets/bar-chart.png';
import logoNotFound from './assets/404Logo.png';

export const logo = appLogo;
export const RedirectLogo = emailConfirmLogo;
export const notFoundLogo = logoNotFound;

export const categories = [
  { name: 'Домой', icon: <HomeIcon color="baseBlue" />, link: '/' },
  {
    name: 'Подписки',
    icon: <SubscriptionsIcon color="baseBlue" />,
    link: '/subscriptions',
  },
  { name: 'История', icon: <HistoryIcon color="baseBlue" />, link: '/history' },
  {
    name: 'Понравившиеся',
    icon: <ThumbUpIcon color="baseBlue" />,
    link: '/likes',
  },
  {
    name: 'Библиотека',
    icon: <VideoLibraryIcon color="baseBlue" />,
    link: '/library',
  },
];

export const userMenu = [
  {
    name: 'Добавить видео',
    icon: <VideoCallIcon color="baseBlue" />,
    link: '/uploadVideo',
  },
  {
    name: 'Мои каналы',
    icon: <LiveTvIcon color="baseBlue" />,
    link: '/channel',
  },
  {
    name: 'Настройки',
    icon: <SettingsIcon color="baseBlue" />,
    link: '/settings',
  },
  {
    name: 'Выйти',
    icon: <LogoutIcon color="baseBlue" />,
    link: '/',
  },
];

export const userChannelPages = [
  {
    name: 'Видео',
    link: '/user-videos',
  },
  {
    name: 'Плейлисты',
    link: '/user-playlists',
  },
  {
    name: 'Каналы',
    link: '/user-channels',
  },
  {
    name: 'О канале',
    link: '/user-about',
  },
];

export const demoThumbnailUrl = 'https://i.ibb.co/51YDLfC/API-Course.png';
export const demoChannelUrl = '/channel/UCmXmlB4-HJytD7wek0Uo97A';
export const demoProfilePicture =
  'http://dergipark.org.tr/assets/app/images/buddy_sample.png';

export const CHANNEL = 'channel';
export const PLAYLIST = 'playlist';
export const VIDEO = 'video';
export const METHOD_POST = 'post';
export const METHOD_PATCH = 'patch';
export const TITLE = 'title';
export const DESCRIPTION = 'description';
export const ID_LIST = 'idList';
export const EMAIL = 'email';
export const PASSWORD = 'password';
export const PASSWORD_2 = 'password2';
export const VIDEO_FILE = 'file';
