import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

import styles from './Thumbnail.module.scss';

const Thumbnail = (props) => {
  const {
    thumbnails = [],
    selectedThumbnail,
    setSelectedThumbnail,
    isError,
  } = props;

  if (isError) {
    return <Typography>{isError}</Typography>;
  }

  return (
    <Box className={styles.thumbBox}>
      {thumbnails?.map((image, index) => {
        if (image === '') {
          return (
            <Box key={`loader_${index}`}>
              <CircularProgress />
            </Box>
          );
        }

        return (
          <Box
            key={`thumb_${index}`}
            className={`${styles.thumb} ${
              image === selectedThumbnail ? styles.active : null
            }`}
          >
            <img
              src={image}
              alt="thumbnails"
              onClick={() => setSelectedThumbnail(image)}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default Thumbnail;
