import Header from '../Header/Header';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { userChannelTabs } from '@constants/frontend';
import { Link } from 'react-router-dom';

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
            marginTop: 12,
            marginBottom: 4,
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
        <List
          sx={{
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {userChannelTabs.map((tab, index) => (
            <Link to={tab.link}>
              <ListItem disablePadding>
                <ListItemButton
                  key={index}
                  sx={{
                    paddingX: 12,
                  }}
                  // selected={item.name === selectCat}
                >
                  <ListItemText primary={tab.name} sx={{ opacity: 1 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Box
          sx={{
            color: 'white',
            maxWidth: '70vw',
            margin: '20px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          user's various trash content
        </Box>
      </Box>
    </>
  );
};

export default UserPage;
