import React, { useEffect } from 'react';
import { Box } from '@mui/material';
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
      <Box
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexGrow: 1,
          background:
            'linear-gradient(0deg, rgba(31, 31, 31, 0.36) 70%, rgba(245, 249, 255, 0.1) 100%)',
          p: '64px 16px',
          flex: 2,
          minHeight: '93vh',
        }}
      >
        <VideoFeed />
      </Box>
    </>
  );
};

export default MainPage;
