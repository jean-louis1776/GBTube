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

const PlayListGrid = () => {
  const theme = useTheme();
  const { idList } = useParams();
  const userId = useSelector(getUserId, shallowEqual);
  const authorId = idList.split('_')[0];
  const userRole = useSelector(getRole, shallowEqual);
  let [content, setContent] = useState(<Loader />);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setContent(<Loader />);
      const { title, description } = await GetChildrenController.getItemById(
        CHANNEL,
        idList.split('_').at(-1)
      );
      setTitle(title);
      setDescription(description);
      const children = await GetChildrenController.getAllItemsById(
        PLAYLIST,
        idList.split('_').at(-1)
      );
      if (children.length === 0) {
        setContent(
          <Typography
            variant={'h6'}
            sx={{ color: 'white', display: 'flex', justifyContent: 'center' }}
          >
            Не создано ни одного Плейлиста{' '}
          </Typography>
        );
      } else {
        setContent(<ContentPlayList children={children} />);
      }
    };
    fetchData().catch(() => {
      setContent('');
      console.log(`Load ${PLAYLIST} fail in PlayListGrid`);
    });
  }, []);

  const handleCreateChild = () => {
    navigate(
      `/${PLAYLIST}/create/${idList}` /*, { state: { idList: location.state.idList } }*/
    );
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

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          width: '72vw',
          margin: '20px auto',
          justifyContent: 'space-around',
        }}
      >
        <Box maxWidth={'25vw'}>
          {title.length > 60 ? (
            <Tooltip title={title}>
              <Typography variant={'h6'} color={'white'} marginBottom={2}>
                Название текущего канала:
                <Typography variant={'body1'}>
                  {title.slice(0, 60) + '...'}
                </Typography>
              </Typography>
            </Tooltip>
          ) : (
            <Typography variant={'h6'} color={'white'} marginBottom={2}>
              Название текущего канала:
              <Typography variant={'body1'}>{title}</Typography>
            </Typography>
          )}
          {description.length > 100 ? (
            <Tooltip title={description}>
              <Typography variant={'h6'} style={{ color: 'white' }}>
                Описание текущего канала:
                <Typography variant={'body1'}>
                  {description.slice(0, 100) + '...'}
                </Typography>
              </Typography>
            </Tooltip>
          ) : (
            <Typography variant={'h6'} style={{ color: 'white' }}>
              Описание текущего канала:
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
              Создать {PLAYLIST}
            </Button>
          ) : (
            ''
          )}
          {isMayModerate() ? (
            <Button
              variant="contained"
              color="baseBlue"
              onClick={handleDeleteChannel}
            >
              Удалить текущий {CHANNEL}
            </Button>
          ) : (
            ''
          )}
        </Box>
      </Stack>
      {content}
      {/*<Link to={`/${childrenType}/create`}>Создать {childrenType}</Link>*/}
    </Box>
  );
};

export default PlayListGrid;
