import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { Header, Loader } from '../';
import GetChildrenController from '../../controllers/GetChildrenController';
import { useNavigate, useParams } from 'react-router-dom';
import { PLAYLIST, VIDEO } from '@constants/frontend';
import EditItemController from '../../controllers/EditItemController';
import VideoCard from '../VideoCard/VideoCard';
import { shallowEqual, useSelector } from 'react-redux';
import { getRole, getUserId } from '../../store/selectors';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import styles from './VideoGrid.module.scss';

const VideoGrid = ({ isParent, getChildren, withHeader }) => {
  const { idList } = useParams();
  const userId = useSelector(getUserId, shallowEqual);
  const authorId = idList.split('_')[0];
  const userRole = useSelector(getRole, shallowEqual);
  let [content, setContent] = useState(<Loader />);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const playListId = idList.split('_').at(-1);
  const [openModal, setOpenModal] = useState(false);

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
              <VideoCard idList={item.idList || item} key={idx} onChannelPage />
            ))}
          </Box>
        );
      }
    };
    fetchData().catch(() => {
      setContent('');
      console.log(`Load ${VIDEO} fail`);
    });

    if (withHeader) {
      document.title = `${title} | GeekTube`;
    }
  }, [title]);

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

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {withHeader && <Header />}

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        className={isParent ? `${styles.videoGridWithPadding}` : ''}
      >
        {isParent ? (
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              minHeight: '86vh',
              position: 'fixed',
              left: '64px',
              top: 'auto',
              padding: '32px',
              margin: '32px',
            }}
          >
            <Box maxWidth={'25vw'}>
              <Box
                sx={{
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                <PlaylistPlayIcon color="baseBlue" sx={{ fontSize: '8rem' }} />
              </Box>

              {title.length > 60 ? (
                <Tooltip title={title}>
                  <Typography
                    variant={'h5'}
                    marginBottom={2}
                    fontWeight={600}
                    sx={{ textTransform: 'uppercase', userSelect: 'none' }}
                  >
                    Название плейлиста:
                  </Typography>
                  <Typography variant="h6" fontWeight={300}>
                    {title.slice(0, 60) + '...'}
                  </Typography>
                </Tooltip>
              ) : (
                <>
                  <Typography
                    variant={'h5'}
                    fontWeight={600}
                    sx={{ textTransform: 'uppercase', userSelect: 'none' }}
                  >
                    Название плейлиста:
                  </Typography>
                  <Typography marginBottom={2} variant="h6" fontWeight={300}>
                    {title}
                  </Typography>
                </>
              )}
              {description.length > 100 ? (
                <Tooltip title={description}>
                  <Typography
                    variant={'h5'}
                    fontWeight={600}
                    sx={{ textTransform: 'uppercase', userSelect: 'none' }}
                  >
                    Описание:
                  </Typography>
                  <Typography variant="h6" fontWeight={300}>
                    {description.slice(0, 100) + '...'}
                  </Typography>
                </Tooltip>
              ) : (
                <>
                  <Typography
                    variant={'h5'}
                    fontWeight={600}
                    sx={{ textTransform: 'uppercase', userSelect: 'none' }}
                  >
                    Описание:
                  </Typography>
                  <Typography variant="h6" fontWeight={300}>
                    {description}
                  </Typography>
                </>
              )}
              {description.length === 0 && (
                <Typography
                  variant="h6"
                  fontWeight={300}
                  sx={{ fontStyle: 'italic', opacity: 0.6, userSelect: 'none' }}
                >
                  Описание отсутствует
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
                  <VideoCallIcon sx={{ mr: 1 }} />
                  Добавить видео
                </Button>
              ) : (
                ''
              )}
              {isMayModerate() ? (
                <Button
                  variant="contained"
                  color="coplimentPink"
                  onClick={handleOpenModal}
                >
                  <DeleteForeverIcon sx={{ mr: 1 }} />
                  Удалить плейлист
                </Button>
              ) : (
                ''
              )}
            </Box>
          </Paper>
        ) : (
          ''
        )}
        <Box className={styles.videoWrapper}>
          <Box
            component="main"
            className={`${styles.videoMain} ${
              isParent ? styles.videoMainWithHeader : ''
            }`}
          >
            {content}
          </Box>
        </Box>
      </Box>

      <ConfirmModal
        submitAction={handleDeletePlaylist}
        openModal={openModal}
        closeModal={handleCloseModal}
        title="Вы хотите полностью удалить данный плейлист?"
        content='Нажимая "Удалить", вы удалите плейлист вместе со всеми видео из этого плейлиста без возможности восстановления. Для отмены нажмите "Отмена".'
        cancelButton="Отмена"
        submitButton="Удалить плейлист"
      />
    </>
  );
};

export default VideoGrid;
