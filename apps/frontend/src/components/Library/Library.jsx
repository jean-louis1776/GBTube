import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { Header, Navbar } from '../';

import styles from './Library.module.scss';

const Library = (props) => {
  const selectedCategory = 'Моя библиотека';

  return (
    <Box sx={{ display: 'flex', pt: 8 }}>
      <Helmet>
        <title>GeekTube | Библиотека</title>
      </Helmet>

      <Header selectedCategory={selectedCategory} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'darkBackground.main',
          p: 2,
          maxHeight: '93vh',
          flex: 2,
        }}
      >
        <Typography>Library</Typography>
      </Box>
    </Box>
  );
};

export default Library;
