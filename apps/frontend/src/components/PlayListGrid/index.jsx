import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Loader } from '../index';
import GetChildrenController from '../../controllers/GetChildrenController';
import { PLAYLIST } from '@constants/frontend';
import { Button } from '@mui/material';
import { ContentPlayList } from './ContentPlayList';

const PlayListGrid = () => {
  const { idList } = useParams();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(idList.split('_') , 'PlayListGrid');
    const fetchData = async () => {
      setContent(<Loader />);
      const children = await GetChildrenController.getAllItemsById(PLAYLIST, idList.split('_').at(-1));
      console.log(children);
      if (children.length === 0) {
        setContent(<p style={{color: 'white'}}>Не создано ни одного Плейлиста </p>);
      } else {
        setContent(<ContentPlayList children={children}/>);
      }
    }
    fetchData().catch(() => {
      setContent('');
      console.log(`Load ${PLAYLIST} fail in PlayListGrid`);
    });
  },[]);

  const handleCreateChild = () => {
    // console.log(location.state.idList);
    navigate(`/${PLAYLIST}/create/${idList}`, { state: { idList: location.state.idList } });
  }

  return (
    <>
      <p style={{color: 'white'}}>Плейлист канала ID: {idList}</p>
      {content}
      <Button onClick={handleCreateChild}>Создать {PLAYLIST}</Button>
      {/*<Link to={`/${childrenType}/create`}>Создать {childrenType}</Link>*/}
    </>
  );
};

export default PlayListGrid;
