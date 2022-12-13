import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Tooltip,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { shallowEqual, useSelector } from 'react-redux';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CHANNEL, VIDEO } from '@constants/frontend';
import { Loader } from '../index';
import VideoController from '../../controllers/VideoController';

import styles from './VideoCard.module.scss';
import { getRole, getUserId } from '../../store/selectors';

const VideoCard = ({ idList, onChannelPage }) => {
  const videoId = idList?.split('_').at(-1);
  const authorId = idList.split('_')[0];
  const userId = useSelector(getUserId, shallowEqual);
  const userRole = useSelector(getRole, shallowEqual);
  const [video, setVideo] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleDeleteVideo = async () => {
    try {
      await VideoController.deleteVideo(idList.split('_').at(-1));
    } catch (err) {
      console.log(err);
    }
    setAnchorEl(null);
    window.location.reload(false);
  };

  const isMayModerate = () => {
    return (
      authorId === userId || userRole === 'admin' || userRole === 'moderator'
    );
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={styles.videoCard}>
      {isMayModerate() && onChannelPage ? (
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className={styles.deleteButton}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            className={styles.deleteList}
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                '& .MuiMenu-list': {
                  p: 0,
                },
              },
            }}
          >
            <MenuItem
              onClick={handleDeleteVideo}
              className={styles.deleteListItem}
            >
              <Typography>Удалить видео</Typography>
            </MenuItem>
          </Menu>
        </>
      ) : null}

      <Link to={`/${VIDEO}/get_one/${idList}`} className={styles.videoLink}>
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
            <Box
              className={styles.videoThumbnail}
              sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
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
        to={`/${CHANNEL}/${idList.split('_').slice(0, 2).join('_')}`}
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
