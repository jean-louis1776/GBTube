import React, { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';
import { CHANNEL, VIDEO } from '@constants/frontend';
import { Loader } from '../index';
import GetChildrenController from '../../controllers/GetChildrenController';

import styles from './VideoListItem.module.scss';

const VideoListItem = ({ idList }) => {
  const videoId = idList.split('_').at(-1);
  const channelId = idList.split('_').at(-2);
  const [video, setVideo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const vids = await GetChildrenController.getItemById(VIDEO, videoId);
      setVideo(vids);
    };
    fetchData()
      .then()
      .catch(() => {
        console.log(`Video ID: ${idList} not found`);
      });
  }, []);

  return (
    <Box className={styles.videoListItem}>
      <Link to={`/${VIDEO}/get_one/${idList}`} className={styles.mainLink}>
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
          <Box className={styles.videoThumbnail}>
            <Loader />
          </Box>
        )}

        <Box className={styles.videoInfo}>
          <Box className={styles.videoInfoTitle}>
            {video?.title?.length > 40 ? (
              <Tooltip title={video.title}>
                <Typography className={styles.title}>
                  {video.title.slice(0, 40) + '...'}
                </Typography>
              </Tooltip>
            ) : (
              <Typography className={styles.title}>{video.title}</Typography>
            )}
          </Box>

          <Box className={styles.videoInfoView}>
            <Typography variant="caption" className={styles.viewCount}>
              {+video.viewsCount} просмотров
            </Typography>
          </Box>
        </Box>
      </Link>

      <Link to={`/${CHANNEL}/${channelId}`} className={styles.channelLink}>
        <Typography variant="subtitle2" className={styles.channelName}>
          <VerifiedIcon sx={{ mr: 1, fontSize: '1rem' }} />
          {video.channelName}
        </Typography>
      </Link>

      <Link className={styles.deleteLink}>
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
