import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Loader } from '../';
// import styles from './VideoGrid.module.scss';
import GetChildrenController from '../../controllers/GetChildrenController';

import { /*useLocation,*/ useNavigate, useParams } from 'react-router-dom';
import { PLAYLIST, VIDEO } from '@constants/frontend';
import EditItemController from '../../controllers/EditItemController';

const VideoGrid = () => {
  const { idList } = useParams();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const {title, description} = await GetChildrenController.getItemById(PLAYLIST, idList.split('_').at(-1));
      console.log(VIDEO, idList);
      const children = await GetChildrenController.getAllItemsById(VIDEO, idList.split('_').at(-1));
      console.log(children);
      if (children.length === 0) {
        setContent(<p style={{color: 'white'}}>Не создано ни одного видео </p>);
      } else {
        setContent(
          <Box>
            <p style={{color: 'white'}}>Название текущего плейлиста: {title}</p>
            <p style={{color: 'white'}}>Описание текущего плейлиста: {description}</p>
            <Stack
              direction={/*direction ||*/ 'row'}
              flexWrap="wrap"
              justifyContent="start"
              alignItems="start"
              gap={2}
            >
              {children.map((item, idx) => (
                <Box key={idx}>
                  <p style={{color: 'white'}}>Видео {item.title}</p>
                </Box>
              ))}
            </Stack>
          </Box>
        );
      }
    }
    fetchData().catch(() => {
      setContent('');
      console.log(`Load ${VIDEO} fail`);
    });
  },[]);

  const handleCreateChild = () => {
    navigate(`/${VIDEO}/create/${idList}`/*, { state: { idList: location.state.idList } }*/);
  }

  const handleDeletePlaylist = async () => {
    console.log(idList, idList.split('_').slice(0, -1).join('_'));
    try {
      await EditItemController.deleteItem(PLAYLIST, idList.split('_').at(-1));
      navigate(`/${PLAYLIST}/get_all/${idList.split('_').slice(0, -1).join('_')}`);
    } catch(err) {
      console.log('delete playlist fail',err);
    }
  }

  return (
    <>
      {content}
      <Button onClick={handleCreateChild}>Создать {VIDEO}</Button>
      <Button onClick={handleDeletePlaylist}>Удалить текущий {PLAYLIST}</Button>
      {/*<Link to={`/${childrenType}/create`}>Создать {childrenType}</Link>*/}
    </>
  );
};

export default VideoGrid;
