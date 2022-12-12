import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { Loader } from '../';
import GetChildrenController from '../../controllers/GetChildrenController';
import { useNavigate, useParams } from 'react-router-dom';
import { PLAYLIST, VIDEO } from '@constants/frontend';
import EditItemController from '../../controllers/EditItemController';
import VideoCard from '../VideoCard/VideoCard';
import Header from '../Header/Header';
import { shallowEqual, useSelector } from 'react-redux';
import { getRole, getUserId } from '../../store/selectors';
import styles from './VideoGrid.module.scss';

const VideoGrid = ({isParent, getChildren}) => {
  const { idList } = useParams();
  const userId = useSelector(getUserId, shallowEqual);
  const authorId = idList.split('_')[0];
  const userRole = useSelector(getRole, shallowEqual);
  let [content, setContent] = useState(<Loader />);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const playListId = idList.split('_').at(-1);

  useEffect(() => {
    const fetchData = async () => {
      setContent(<Loader />);
      if (isParent) {
        const { title, description } = await GetChildrenController.getItemById(
          PLAYLIST,
          playListId
        );
        setTitle(title);
        setDescription(description);
      }

      const children = await getChildren(playListId, VIDEO);
      console.log(children, 'video children');

      if (children.length === 0) {
        setContent(
          <Typography sx={{ mb: 8 }} className={styles.videoTitle}>
            Не создано ни одного видео{' '}
          </Typography>
        );
      } else {
        setContent(
          <Box className={styles.videoGrid}>
            {children.map((item, idx) => (
              <VideoCard idList={item.idList || item} key={idx} />
            ))}
          </Box>
        );
      }
    };
    fetchData().catch(() => {
      setContent('');
      console.log(`Load ${VIDEO} fail`);
    });
  }, []);

  const handleCreateChild = () => {
    navigate(`/${VIDEO}/create/${idList}`);
  };

  const isMayModerate = () => {
    return (
      authorId === userId || userRole === 'admin' || userRole === 'moderator'
    );
  };

  const isAuthor = () => authorId === userId;

  const handleDeletePlaylist = async () => {
    try {
      await EditItemController.deleteItem(PLAYLIST, playListId);
      navigate(
        `/${PLAYLIST}/get_all/${idList.split('_').slice(0, -1).join('_')}`,
        { replace: true }
      );
    } catch (err) {
      console.log('delete playlist fail', err);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isParent ?
        <Stack
          sx={{
            flexDirection: 'row',
            width: '60vw',
            margin: '20px auto',
            justifyContent: 'space-around',
          }}
        >
          <Box maxWidth={'25vw'}>
            {title.length > 60 ? (
              <Tooltip title={title}>
                <Typography variant={'h6'} color={'white'} marginBottom={2}>
                  Название плейлиста:
                  <Typography variant={'body1'}>
                    {title.slice(0, 60) + '...'}
                  </Typography>
                </Typography>
              </Tooltip>
            ) : (
              <Typography variant={'h6'} color={'white'} marginBottom={2}>
                Название плейлиста:
                <Typography variant={'body1'}>{title}</Typography>
              </Typography>
            )}
            {description.length > 100 ? (
              <Tooltip title={description}>
                <Typography variant={'h6'} style={{ color: 'white' }}>
                  Описание:
                  <Typography variant={'body1'}>
                    {description.slice(0, 100) + '...'}
                  </Typography>
                </Typography>
              </Tooltip>
            ) : (
              <Typography variant={'h6'} style={{ color: 'white' }}>
                Описание:
                <Typography variant={'body1'}>{description}</Typography>
              </Typography>
            )}
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            gap={2}
          >
            {isAuthor() ? (
              <Button
                variant="contained"
                color="baseBlue"
                onClick={handleCreateChild}
              >
                Создать {VIDEO}
              </Button>
            ) : (
              ''
            )}
            {isMayModerate() ? (
              <Button
                variant="contained"
                color="baseBlue"
                onClick={handleDeletePlaylist}
              >
                Удалить текущий {PLAYLIST}
              </Button>
            ) : (
              ''
            )}
          </Box>
        </Stack>
        : ''}
      <Box className={styles.videoWrapper}>
        <Box component="main" className={styles.videoMain}>
          {content}
        </Box>
      </Box>
    </Box>
  );
};

export default VideoGrid;
