import React, { useEffect, useRef, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Header } from '../';
import SearchHistoryForm from './SearchHistoryForm';
import VideoListItem from '../VideoListItem/VideoListItem';
import VideoController from '../../controllers/VideoController';
import styles from './History.module.scss';
import { store } from '../../store';
import Loader from '../Loader/Loader';
import { VIDEO } from '@constants/frontend';

const History = () => {
  const selectedCategory = 'История';

  const { profileReducer } = store.getState();
  const currentUserId = Number(profileReducer.id);

  const [likedVideoComp, setLikedVideoComp] = useState(<Loader />);
  const refLikedVideos = useRef([]);

  useEffect(() => {
    document.title = 'История | GeekTube';

    const videoHistory = async (userId) => {
      return VideoController.getVideoHistory(userId);
    };
    videoHistory(currentUserId).then((videos) => {
      refLikedVideos.current = videos;
      setLikedVideoComp(
        <Box className={styles.linkCard}>
          {videos.map((idList) => (
            <Link key={idList} to={`/${VIDEO}/get_one/${idList}`}>
              <VideoListItem idList={idList} />
            </Link>
          ))}
          <Divider className={styles.divider} />
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

          {likedVideoComp}
        </Box>
      </Box>
    </>
  );
};

export default History;
