import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { Header, Navbar, VideoGrid } from '../';

import styles from './MainPage.module.scss';

const MainPage = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('Домой');
  const [videos, setVideos] = useState([]);

  return (
    <>
      <Header />

      <Stack
        sx={{ flexDirection: { sx: 'column', md: 'row' }, height: '93vh' }}
      >
        <Box
          sx={{
            height: { sx: 'auto', md: '93vh' },
            boxShadow: '9px 0 6px -6px #ccc',
            px: { sx: 0, md: 2 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Navbar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <Typography
            className={styles.copy}
            variant="body2"
            sx={{ mb: 1.5, color: '#999', userSelect: 'none' }}
          >
            &copy; 2022 GeekTube Team
          </Typography>
        </Box>

        <Box p={2} sx={{ overflowY: 'auto', height: '93vh', flex: 2 }}>
          <VideoGrid videos={videos} />
        </Box>
        {/* <div>Home</div> */}
      </Stack>
    </>
  );
};

export default MainPage;
