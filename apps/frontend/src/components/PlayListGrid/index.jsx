import { /*useLocation,*/ useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Loader } from '../index';
import GetChildrenController from '../../controllers/GetChildrenController';
import { CHANNEL, PLAYLIST } from '@constants/frontend';
import { Box, Button } from '@mui/material';
import { ContentPlayList } from './ContentPlayList';
import EditItemController from '../../controllers/EditItemController';

const PlayListGrid = () => {
  const { idList } = useParams();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    console.log(idList.split('_') , 'PlayListGrid');
    const fetchData = async () => {
      setContent(<Loader />);
      // console.log(idList.split('_').at(-1), 'playlist ID');
      const {title, description} = await GetChildrenController.getItemById(CHANNEL, idList.split('_').at(-1));
      const children = await GetChildrenController.getAllItemsById(PLAYLIST, idList.split('_').at(-1));
      console.log(children, 'children');
      if (children.length === 0) {
        setContent(<p style={{color: 'white'}}>Не создано ни одного Плейлиста </p>);
      } else {
        setContent(
          <Box>
            <p style={{color: 'white'}}>Название текущего канала: {title}</p>
            <p style={{color: 'white'}}>Описание текущего канала: {description}</p>
            <ContentPlayList children={children}/>
          </Box>
        );
      }
    }
    fetchData().catch(() => {
      setContent('');
      console.log(`Load ${PLAYLIST} fail in PlayListGrid`);
    });
  },[]);

  const handleCreateChild = () => {
    // console.log(location.state.idList);
    navigate(`/${PLAYLIST}/create/${idList}`/*, { state: { idList: location.state.idList } }*/);
  }

  const handleDeleteChannel = async () => {
    console.log(idList, idList.split('_').slice(0, -1).join('_'));
    try {
      await EditItemController.deleteItem(CHANNEL, idList.split('_').at(-1));
      navigate(`/${CHANNEL}/get_all/${idList.split('_').slice(0, -1).join('_')}`);
    } catch(err) {
      console.log('delete channel fail', err);
    }
  }

  return (
    <>
      {content}
      <Button onClick={handleCreateChild}>Создать {PLAYLIST}</Button>
      <Button onClick={handleDeleteChannel}>Удалить текущий {CHANNEL}</Button>
      {/*<Link to={`/${childrenType}/create`}>Создать {childrenType}</Link>*/}
    </>
  );
};

export default PlayListGrid;
