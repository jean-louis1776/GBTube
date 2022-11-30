import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Loader } from '../';
import GetChildrenController from '../../controllers/GetChildrenController';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CHANNEL } from '@constants/frontend';
import { ContentChannel } from './ContentChannel';
import Header from '../Header/Header';

const ChannelGrid = () => {
  const { user_id } = useParams();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setContent(<Loader />);
      const children = await GetChildrenController.getAllItemsById(
        CHANNEL,
        user_id
      );
      console.log(children);
      if (children.length === 0) {
        setContent(
          <p style={{ color: 'white' }}>Не создано ни одного Канала </p>
        );
      } else {
        setContent(<ContentChannel children={children} />);
      }
    };
    fetchData().catch(() => {
      setContent('');
      console.log(`Load ${CHANNEL} fail in ChannelGrid`);
    });
  }, []);

  const handleCreateChild = () => {
    console.log(location.state.idList);
    navigate(`/${CHANNEL}/create/${user_id}`, {
      state: { idList: location.state.idList },
    });
  };

  return (
    <Box sx={{ pt: 8 }}>
      <Header />

      <p style={{ color: 'white' }}>Канал пользователя ID: {user_id}</p>
      {content}
      <Button onClick={handleCreateChild}>Создать {CHANNEL}</Button>
      {/*<Link to={`/${childrenType}/create`}>Создать {childrenType}</Link>*/}
    </Box>
  );
};

export default ChannelGrid;
