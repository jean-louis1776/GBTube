import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LogoutIcon from '@mui/icons-material/Logout';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import appLogo from './assets/logo.png';
import emailConfirmLogo from './assets/bar-chart.png';
import logoNotFound from './assets/404Logo.png';
import uploadLogo from './assets/uploadLogo.png';
import demoThumb from './assets/demoThumb.png';
import searchLogo from './assets/searchErrLogo.png';

export const logo = appLogo;
export const RedirectLogo = emailConfirmLogo;
export const notFoundLogo = logoNotFound;
export const uploadVideoLogo = uploadLogo;
export const searchErrorLogo = searchLogo;

export const categories = [
  { name: 'Главная', icon: <HomeIcon color="baseBlue" />, link: '/' },
  { name: 'История', icon: <HistoryIcon color="baseBlue" />, link: '/history' },
  {
    name: 'Понравившиеся',
    icon: <ThumbUpIcon color="baseBlue" />,
    link: '/likes',
  },
  {
    name: 'Мои подписки',
    icon: <SubscriptionsIcon color="baseBlue" />,
    link: '/subscriptions',
  },
];

export const nestedCategories = [
  {
    name: 'Мои подборки',
    icon: <PlaylistPlayIcon color="baseBlue" />,
  },
];

export const userMenu = [
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

export const userChannelTabs = [
  {
    name: 'Видео',
    link: '/user-channel',
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

export const demoThumbnail = demoThumb;

export const demoChannelUrl = '/channel/UCmXmlB4-HJytD7wek0Uo97A';
export const demoVideoUrl = '/video/GDa8kZLNhJ4';
export const demoChannelTitle = 'JavaScript Mastery';
export const demoVideoTitle =
  'Build and Deploy 5 JavaScript & React API Projects in 10 Hours - Full Course | RapidAPI';
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

export const API_URL = 'http://localhost:3333/api';

export const CLIENT_API = 'http://localhost:4200';
