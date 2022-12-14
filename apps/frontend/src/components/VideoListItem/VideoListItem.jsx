import React, { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link, useNavigate } from 'react-router-dom';
import { CHANNEL, VIDEO } from '@constants/frontend';
import { Loader } from '../index';
import VideoController from '../../controllers/VideoController';

import styles from './VideoListItem.module.scss';
import { store } from '../../store';
import { searchStringSelector } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHistoryItem } from '../../store/slice';

const VideoListItem = ({ idList, userId, deleteFromHistory }) => {
  const videoId = idList.split('_').at(-1);
  const [video, setVideo] = useState({});
  const dispatch = useDispatch();
  const search = useSelector(searchStringSelector);

  useEffect(() => {
    const fetchData = async () => {
      setVideo(await VideoController.getVideoInfo(videoId));
    };
    fetchData()
      .then()
      .catch(() => {
        console.log(`Video ID: ${idList} not found`);
      });
  }, []);

  if (!video.title?.includes(search)) {
    return null;
  }

  async function onDelFromStory() {
    try {
      await VideoController.delVideoFromHistory(userId, videoId);
      dispatch(deleteHistoryItem(videoId));
    } catch (error) {
      console.log(
        'Не удалось удалить видео из вашей истории. Текст ошибки:',
        error.message
      );
    }
  }

  return (
    <Box className={styles.videoListItem}>
      <Link to={`/${VIDEO}/get_one/${idList}`} className={styles.mainLink}>
        <Box className={styles.videoThumbWrapper}>
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

          <Box className={styles.duration}>
            {Object.hasOwn(video, 'duration') ? (
              <Typography>
                {video.duration.split(' : ')[0] === '00'
                  ? `${video.duration.split(' : ')[1]}:${
                      video.duration.split(' : ')[2]
                    }`
                  : `${video.duration.split(' : ')[0]}:${
                      video.duration.split(' : ')[1]
                    }:${video.duration.split(' : ')[2]}`}
              </Typography>
            ) : (
              ''
            )}
          </Box>
        </Box>

        <Box className={styles.videoInfo}>
          <Box className={styles.videoInfoTitle}>
            {video?.title?.length > 35 ? (
              <Tooltip title={video.title}>
                <Typography className={styles.title}>
                  {video.title.slice(0, 35) + '...'}
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

      <Link
        to={`/${CHANNEL}/${idList.split('_').slice(0, 2).join('_')}`}
        className={styles.channelLink}
      >
        <Typography variant="subtitle2" className={styles.channelName}>
          <VerifiedIcon sx={{ mr: 1, fontSize: '1rem' }} />
          {video.channelName}
        </Typography>
      </Link>

      {deleteFromHistory && (
        <Link className={styles.deleteLink}>
          <Tooltip title="Удалить из истории">
            <IconButton
              className={styles.deleteButton}
              onClick={onDelFromStory}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Link>
      )}
    </Box>
  );
};

export default VideoListItem;
