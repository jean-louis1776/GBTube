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
          bgcolor: 'darkBackground.main',
          p: 2,
          flex: 2,
        }}
      >
        <VideoFeed />
      </Box>
    </>
  );
};

export default MainPage;
