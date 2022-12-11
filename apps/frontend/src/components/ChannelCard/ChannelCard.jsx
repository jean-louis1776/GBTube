import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

import styles from './ChannelCard.module.scss';

const ChannelCard = ({ channelTitle }) => {
  return (
    <Box>
      {/* <Box className={styles.videoCard}>
        <Link
          to={`/${PLAYLIST}/get_all/${idList.split('_').slice(0, 2).join('_')}`}
          className={styles.channelLink}
        >
          <Box className={styles.videoInfo}>
            <Box className={styles.videoInfoTitle}>
              {video?.title?.length > 50 ? (
                <Tooltip title={video.title}>
                  <Typography className={styles.title}>
                    {video.title.slice(0, 50) + '...'}
                  </Typography>
                </Tooltip>
              ) : (
                <Typography className={styles.title}>{video.title}</Typography>
              )}
            </Box>

            <Box className={styles.videoInfoView}>
              {Object.hasOwn(video, 'channelName') ? (
                <Typography variant="subtitle2" className={styles.channelName}>
                  <VerifiedIcon sx={{ mr: 1, fontSize: '1rem' }} />
                  {video.channelName}
                </Typography>
              ) : (
                ''
              )}
            </Box>
          </Box>
        </Link>
      </Box> */}
    </Box>
  );
};

export default ChannelCard;
