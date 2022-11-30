import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

import { Header, Navbar } from '../';

import styles from './Likes.module.scss';

const Likes = (props) => {
  const selectedCategory = 'Понравившиеся';

  return (
    <Box sx={{ display: 'flex', pt: 8 }}>
      <Helmet>
        <title>GeekTube | Понравившиеся</title>
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
        <Typography>Likes</Typography>
      </Box>
    </Box>
  );
};

export default Likes;
