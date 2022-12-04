import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Loader } from '../';
import GetChildrenController from '../../controllers/GetChildrenController';
import { useNavigate, useParams } from 'react-router-dom';
import { CHANNEL } from '@constants/frontend';
import { ContentChannel } from './ContentChannel';
import { useTheme } from '@mui/material/styles';
import Header from '../Header/Header';

const ChannelGrid = () => {
  const { user_id } = useParams();
  let [content, setContent] = useState(<Loader />);
  const navigate = useNavigate();
  const theme = useTheme();

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
    navigate(`/${CHANNEL}/create/${user_id}`);
  };

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
          width: '77vw',
          margin: '20px auto',
          justifyContent: 'space-around',
        }}
      >
        <Typography variant={'h6'} style={{ color: 'white' }}>
          Каналы пользователя ID: {user_id}
        </Typography>
        <Button
          variant='contained'
          color='baseBlue'
          onClick={handleCreateChild}
        >
          Создать {CHANNEL}
        </Button>
      </Stack>
      {content}
      {/*<Link to={`/${childrenType}/create`}>Создать {childrenType}</Link>*/}
    </Box>
  );
};

export default ChannelGrid;
