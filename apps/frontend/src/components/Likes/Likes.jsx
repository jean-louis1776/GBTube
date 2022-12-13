import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Header, Loader } from '../';
import VideoCard from '../VideoCard/VideoCard';
import { store } from '../../store';
import VideoController from '../../controllers/VideoController';

import styles from './Likes.module.scss';

const Likes = (props) => {
  const selectedCategory = 'Понравившиеся';

  const { profileReducer } = store.getState();
  const currentUserId = Number(profileReducer.id);

  const [likesVideoComp, setLikesVideoComp] = useState(<Loader />);
  const refLikesVideos = useRef([]);

  useEffect(() => {
    document.title = 'Понравившиеся | GeekTube';

    const videoLikes = async (userId) => {
      return VideoController.getVideoLikes(userId);
    };
    videoLikes(currentUserId).then((videos) => {
      refLikesVideos.current = videos;

      refLikesVideos.current.length !== 0
        ? setLikesVideoComp(
            <Typography variant="h5" sx={{ userSelect: 'none' }}>
              Поставьте лайк на свое первое видео, оно будет ждать тут
            </Typography>
          )
        : setLikesVideoComp(
            <Box className={styles.likesGrid}>
              {videos
                .slice()
                .reverse()
                .map((idList) => (
                  <VideoCard idList={idList} key={idList} />
                ))}
            </Box>
          );
    });
  }, []);

  return (
    <>
      <Header selectedCategory={selectedCategory} />

      <Box className={styles.likesWrapper}>
        <Box component="main" className={styles.likesMain}>
          <Typography sx={{ mb: 8 }} className={styles.likesTitle} variant="h4">
            Понравившиеся видео
          </Typography>

          {likesVideoComp}
        </Box>
      </Box>
    </>
  );
};

export default Likes;
