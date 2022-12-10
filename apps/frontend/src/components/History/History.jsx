import React, { useEffect, useRef, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Header } from '../';
import SearchHistoryForm from './SearchHistoryForm';
import VideoListItem from '../VideoListItem/VideoListItem';
import VideoController from '../../controllers/VideoController';
import { store } from '../../store';
import Loader from '../Loader/Loader';
import { VIDEO } from '@constants/frontend';

import styles from './History.module.scss';

const History = () => {
  const selectedCategory = 'История';

  const { profileReducer } = store.getState();
  const currentUserId = Number(profileReducer.id);

  const [storyVideoComp, setStoryVideoComp] = useState(<Loader />);
  const refStoryVideos = useRef([]);

  useEffect(() => {
    document.title = 'История | GeekTube';

    const videoHistory = async (userId) => {
      return VideoController.getVideoHistory(userId);
    };
    videoHistory(currentUserId).then((videos) => {
      refStoryVideos.current = videos;
      setStoryVideoComp(
        <Box>
          {videos.map((idList) => (
            <VideoListItem idList={idList} key={idList} />
          ))}
        </Box>
      );
    });
  }, []);

  return (
    <>
      <Header selectedCategory={selectedCategory} />

      <Box className={styles.historyWrapper}>
        <Box component="main" className={styles.historyMain}>
          <Typography className={styles.historyTitle} variant="h4">
            История просмотров
          </Typography>

          <SearchHistoryForm />

          {storyVideoComp}
        </Box>
      </Box>
    </>
  );
};

export default History;
