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

export const logo = 'https://i.ibb.co/wdmBFMK/logo.png';
export const RedirectLogo = 'https://i.ibb.co/JCB64v6/bar-chart.png';
export const notFoundLogo = 'https://i.ibb.co/HNHX2dx/404Logo.png';

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
    link: '/channels',
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

export const demoThumbnailUrl = 'https://i.ibb.co/51YDLfC/API-Course.png';
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
