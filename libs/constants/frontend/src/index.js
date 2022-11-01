import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

export const logo = 'https://i.ibb.co/wdmBFMK/logo.png';

export const categories = [
  { name: 'Домой', icon: <HomeIcon />, link: '/' },
  { name: 'Подписки', icon: <SubscriptionsIcon />, link: '/subscriptions' },
  { name: 'История', icon: <HistoryIcon />, link: '/history' },
  { name: 'Понравившиеся', icon: <ThumbUpIcon />, link: '/likes' },
  { name: 'Библиотека', icon: <VideoLibraryIcon />, link: '/library' },
];

export const demoThumbnailUrl = 'https://i.ibb.co/51YDLfC/API-Course.png';
export const demoChannelUrl = '/channel/UCmXmlB4-HJytD7wek0Uo97A';
export const demoVideoUrl = '/video/GDa8kZLNhJ4';
export const demoChannelTitle = 'JavaScript Mastery';
export const demoVideoTitle =
  'Build and Deploy 5 JavaScript & React API Projects in 10 Hours - Full Course | RapidAPI';
export const demoProfilePicture =
  'http://dergipark.org.tr/assets/app/images/buddy_sample.png';
