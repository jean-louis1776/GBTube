import React from 'react';
import { Box, Typography } from '@mui/material';
import { Header } from '../';
import VideoCard from '../VideoCard/VideoCard';

import styles from './Likes.module.scss';

const Likes = (props) => {
  const selectedCategory = 'Понравившиеся';

  const listId = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <>
      <Header selectedCategory={selectedCategory} />

      <Box className={styles.likesWrapper}>
        <Box component="main" className={styles.likesMain}>
          <Typography sx={{ mb: 8 }} className={styles.likesTitle} variant="h4">
            Понравившиеся видео
          </Typography>

          <Box className={styles.likesGrid}>
            {listId.map((index) => (
              <VideoCard key={index} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Likes;
