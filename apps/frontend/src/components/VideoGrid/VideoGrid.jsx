import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Loader } from '../';
import GetChildrenController from '../../controllers/GetChildrenController';
import {
  Link,
  /*useLocation,*/ useNavigate,
  useParams,
} from 'react-router-dom';
import { PLAYLIST, VIDEO } from '@constants/frontend';
import EditItemController from '../../controllers/EditItemController';
import VideoCard from '../VideoCard/VideoCard';
import Header from '../Header/Header';
import { shallowEqual, useSelector } from 'react-redux';
import { getRole, getUserId } from '../../store/selectors';

const VideoGrid = () => {
  const { idList } = useParams();
  const userId = useSelector(getUserId, shallowEqual);
  const userRole = useSelector(getRole);
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setContent(<Loader />);
      const { title, description } = await GetChildrenController.getItemById(
        PLAYLIST,
        idList.split('_').at(-1)
      );
      console.log(VIDEO, idList);
      const children = await GetChildrenController.getAllItemsById(
        VIDEO,
        idList.split('_').at(-1)
      );
      console.log(children);
      if (children.length === 0) {
        setContent(
          <p style={{ color: 'white' }}>Не создано ни одного видео </p>
        );
      } else {
        setContent(
          <Box>
            <p style={{ color: 'white' }}>
              Название текущего плейлиста: {title}
            </p>
            <p style={{ color: 'white' }}>
              Описание текущего плейлиста: {description}
            </p>
            <Stack
              direction={/*direction ||*/ 'row'}
              flexWrap="wrap"
              justifyContent="start"
              alignItems="start"
              gap={2}
            >
              {children.map((item, idx) => (
                <Link
                  key={idx}
                  to={`/${VIDEO}/get_one/${item.idList}`}
                  style={{ color: 'white' }}
                >
                  <VideoCard video={item} />
                </Link>
              ))}
            </Stack>
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
    navigate(
      `/${VIDEO}/create/${idList}` /*, { state: { idList: location.state.idList } }*/
    );
  };

  const isMayModerate = () => {
    const authorId = idList.split('_')[0];
    return authorId === userId || userRole === 'admin' || userRole === 'moderator';
  };

  const handleDeletePlaylist = async () => {
    console.log(idList, idList.split('_').slice(0, -1).join('_'));
    try {
      await EditItemController.deleteItem(PLAYLIST, idList.split('_').at(-1));
      navigate(
        `/${PLAYLIST}/get_all/${idList.split('_').slice(0, -1).join('_')}`,
        { replace: true }
      );
    } catch (err) {
      console.log('delete playlist fail', err);
    }
  };

  return (
    <Box sx={{ pt: 8 }}>
      <Header />
      {/*<Box*/}
      {/*  sx={{*/}
      {/*    // display: 'flex',*/}
      {/*    // flexFlow: 'row wrap',*/}
      {/*    // gap: 1,*/}
      {/*    margin: '20px',*/}
      {/*    display: 'grid',*/}
      {/*    columnGap: 3,*/}
      {/*    rowGap: 2,*/}
      {/*    gridTemplateColumns: {*/}
      {/*      xs: 'repeat(1, 1fr)',*/}
      {/*      sm: 'repeat(2, 1fr)',*/}
      {/*      md: 'repeat(3, 1fr)',*/}
      {/*      lg: 'repeat(4, 1fr)',*/}
      {/*      xl: 'repeat(5, 1fr)',*/}
      {/*    },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {videos.map(() => (*/}
      {/*    <VideoCard />*/}
      {/*  ))}*/}
      {/*</Box>*/}
      {content}
      <Button onClick={handleCreateChild}>Создать {VIDEO}</Button>
      {isMayModerate() ? <Button onClick={handleDeletePlaylist}>Удалить текущий {PLAYLIST}</Button> : ''}
      {/*<Link to={`/${childrenType}/create`}>Создать {childrenType}</Link>*/}
    </Box>
  );
};

export default VideoGrid;
