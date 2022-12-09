import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Tooltip, Box } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { PLAYLIST, VIDEO } from '@constants/frontend';
import GetChildrenController from '../../controllers/GetChildrenController';

import { theme } from '../../theme';

import styles from './VideoCard.module.scss';
import { Loader } from '../index';

const VideoCard = ({ idList }) => {
  const videoId = idList?.split('_').at(-1);
  const [video, setVideo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const vids = await GetChildrenController.getItemById(VIDEO, videoId);
      console.log(vids);
      setVideo(vids);
    };
    fetchData()
      .then()
      .catch(() => {
        console.log(`Video ID: ${idList} not found`);
      });
  }, []);

  return (
    <Box className={styles.videoCard}>
      <Link to={`/${VIDEO}/get_one/${idList}`} className={styles.videoLink}>
        {Object.hasOwn(video, 'thumbnail') ? (
          <Box
            className={styles.videoThumbnail}
            sx={{ backgroundImage: `url(${video.thumbnail})` }}
          >
            <Box className={styles.blur}>
              <img src={video.thumbnail} alt={`Thumbnail:${idList}`} />
            </Box>
          </Box>
        ) : (
          <Box
            className={styles.videoThumbnail}
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <Loader />
          </Box>
        )}

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
            {Object.hasOwn(video, 'viewsCount') ? (
              <Typography variant="caption" className={styles.viewCount}>
                {'Просмотров: '}
                {+video.viewsCount}
              </Typography>
            ) : (
              ''
            )}
          </Box>
        </Box>
      </Link>
      <Link
        to={`/${PLAYLIST}/get_all/${idList.split('_').slice(0, 2).join('_')}`}
        className={styles.channelLink}
      >
        {Object.hasOwn(video, 'channelName') ? (
          <Typography variant="subtitle2" className={styles.channelName}>
            <VerifiedIcon sx={{ mr: 1, fontSize: '1rem' }} />
            {video.channelName}
          </Typography>
        ) : (
          ''
        )}
      </Link>
    </Box>
  );
};

export default VideoCard;
