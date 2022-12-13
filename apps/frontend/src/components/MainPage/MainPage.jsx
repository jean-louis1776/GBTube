import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Header } from '../';
import VideoFeed from '../MainPageFeed/VideoFeed';

const MainPage = () => {
  const selectedCategory = 'Главная';

  useEffect(() => {
    document.title = 'GeekTube';
  }, []);

  return (
    <>
      <Header selectedCategory={selectedCategory} />
      <Box sx={{ pt: '64px ' }}>
        <Box
          component="main"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            flexGrow: 1,
            background:
              'linear-gradient(0deg, rgba(31, 31, 31, 0.36) 70%, rgba(245, 249, 255, 0.1) 100%)',
            p: '16px 32px',
            flex: 2,
            minHeight: '93vh',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              width: '100%',
              textAlign: 'left',
              userSelect: 'none',
            }}
            variant="h4"
          >
            Главная
          </Typography>

          <VideoFeed />
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
