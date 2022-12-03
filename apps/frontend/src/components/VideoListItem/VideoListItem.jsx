import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';

import { CHANNEL, demoThumbnail } from '@constants/frontend';

import styles from './VideoListItem.module.scss';

const VideoListItem = () => {
  const viewCount = '100 000 000';

  return (
    <Box className={styles.videoListItem}>
      <Box className={styles.videoThumbnail}>
        <img src={demoThumbnail} alt="Thumbnail" />
      </Box>

      <Box className={styles.videoInfo}>
        <Box className={styles.videoInfoTitle}>
          <Typography className={styles.title}>
            Never Gonna Give You Up
          </Typography>

          <Link to={`/user-channel`} className={styles.channelLink}>
            <Typography variant="subtitle2" className={styles.channelName}>
              <VerifiedIcon sx={{ mr: 1, fontSize: '1rem' }} />
              Rick & Morty
            </Typography>
          </Link>
        </Box>

        <Box className={styles.videoInfoView}>
          <Typography variant="caption" className={styles.viewCount}>
            {viewCount} просмотров
          </Typography>
        </Box>
      </Box>

      <Link>
        <Tooltip title="Удалить из истории">
          <IconButton className={styles.deleteButton}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  );
};

export default VideoListItem;
