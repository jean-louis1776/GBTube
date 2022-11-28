import Header from '../Header/Header';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { userChannelPages } from '@constants/frontend';

const UserPage = () => {
  const theme = useTheme();

  const SubscribeButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
    padding: '7px 15px',
    transition: '.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.shadows.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  const [subscribe, setSubscribe] = useState(true);

  return (
    <>
      <Header withNavbar />
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginY: 12,
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Avatar sx={{ width: 100, height: 100 }} />
          <Box
            sx={{
              display: 'flex',
              width: '20vw',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant={'h5'}>UserName</Typography>
              <Typography variant={'subtitle2'}>100500 подписчиков</Typography>
            </Box>
            {subscribe ? (
              <SubscribeButton
                onClick={() => setSubscribe((prevState) => !prevState)}
                sx={{
                  backgroundColor: theme.palette.coplimentPink.main,
                  color: theme.palette.coplimentPink.contrastText,
                }}
              >
                Подписаться
              </SubscribeButton>
            ) : (
              <SubscribeButton
                onClick={() => setSubscribe((prevState) => !prevState)}
              >
                Отписаться
              </SubscribeButton>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          Shitbox
        </Box>
      </Box>
    </>
  );
};

export default UserPage;
