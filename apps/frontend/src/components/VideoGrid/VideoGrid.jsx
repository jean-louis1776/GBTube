import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Loader } from '../';
// import styles from './VideoGrid.module.scss';
import GetChildrenController from '../../controllers/GetChildrenController';

import { /*useLocation,*/ useNavigate, useParams } from 'react-router-dom';
import { VIDEO } from '@constants/frontend';

const VideoGrid = () => {
  const { idList } = useParams();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      console.log(VIDEO, idList);
      const children = await GetChildrenController.getAllItemsById(VIDEO, idList.split('_').at(-1));
      console.log(children);
      if (children.length === 0) {
        setContent(<p style={{color: 'white'}}>Не создано ни одного видео </p>);
      } else {
        setContent(
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

  return (
    <>
      <p style={{color: 'white'}}>Видео плейлиста ID: {idList}</p>
      {content}
      <Button onClick={handleCreateChild}>Создать {VIDEO}</Button>
      {/*<Link to={`/${childrenType}/create`}>Создать {childrenType}</Link>*/}
    </>
  );
};

export default VideoGrid;
