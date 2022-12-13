import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Loader } from '../index';
import GetChildrenController from '../../controllers/GetChildrenController';
import { CHANNEL, PLAYLIST } from '@constants/frontend';
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { ContentPlayList } from './ContentPlayList';
import EditItemController from '../../controllers/EditItemController';
import { useTheme } from '@mui/material/styles';
import Header from '../Header/Header';
import { shallowEqual, useSelector } from 'react-redux';
import { getRole, getUserId } from '../../store/selectors';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const PlayListGrid = ({ isParent }) => {
  const theme = useTheme();
  const { idList } = useParams();
  const userId = useSelector(getUserId, shallowEqual);
  const authorId = idList.split('_')[0];
  const channelId = idList.split('_').at(-1);
  const userRole = useSelector(getRole, shallowEqual);
  let [content, setContent] = useState(<Loader />);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setContent(<Loader />);
      if (isParent) {
        const { title, description } = await GetChildrenController.getItemById(
          CHANNEL,
          channelId
        );
        setTitle(title);
        setDescription(description);
      }
      const children = await GetChildrenController.getAllItemsById(
        channelId,
        PLAYLIST
      );
      if (children.length === 0) {
        setContent(
          <Typography
            variant={'h6'}
            sx={{ color: 'white', display: 'flex', justifyContent: 'center' }}
          >
            Не создано ни одного плейлиста
          </Typography>
        );
      } else {
        setContent(<ContentPlayList children={children} />);
      }
    };
    fetchData().catch((err) => {
      setContent('');
      console.log(err);
      console.log(`Load ${PLAYLIST} fail in PlayListGrid`);
    });
  }, []);

  const handleCreateChild = () => {
    navigate(`/${PLAYLIST}/create/${idList}`);
  };

  const handleDeleteChannel = async () => {
    try {
      await EditItemController.deleteItem(CHANNEL, idList.split('_').at(-1));
      navigate(
        `/${CHANNEL}/get_all/${idList.split('_').slice(0, -1).join('_')}`,
        { replace: true }
      );
    } catch (err) {
      console.log('delete channel fail', err);
    }
  };

  const isMayModerate = () => {
    return (
      authorId === userId || userRole === 'admin' || userRole === 'moderator'
    );
  };

  const isAuthor = () => authorId === userId;

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isParent ? (
          <Stack
            sx={{
              flexDirection: 'row',
              width: '72vw',
              margin: '20px auto',
              justifyContent: 'space-around',
            }}
          >
            <Box display={'flex'} justifyContent={'center'} gap={2}>
              {isAuthor() ? (
                <Button
                  variant="outlined"
                  color="whiteButton"
                  onClick={handleCreateChild}
                >
                  <PlaylistAddIcon sx={{ mr: 1 }} />
                  Создать новый плейлист
                </Button>
              ) : (
                ''
              )}
              {isMayModerate() ? (
                <Button
                  variant="outlined"
                  color="coplimentPink"
                  onClick={handleOpenModal}
                >
                  <DeleteForeverIcon sx={{ mr: 1 }} />
                  Удалить канал
                </Button>
              ) : (
                ''
              )}
            </Box>
          </Stack>
        ) : (
          ''
        )}
        {content}
      </Box>

      <ConfirmModal
        submitAction={handleDeleteChannel}
        openModal={openModal}
        closeModal={handleCloseModal}
        title="Вы хотите полностью удалить этот канал?"
        content='Нажимая "Удалить", вы удалите канал вместе с видео, плейлистами и вашими подписчиками без возможности восстановления. Для отмены нажмите "Отмена".'
        cancelButton="Отмена"
        submitButton="Удалить канал"
      />
    </>
  );
};

export default PlayListGrid;
