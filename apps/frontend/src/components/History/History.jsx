import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

import { Header, Navbar } from '../';

import styles from './History.module.scss';

const History = (props) => {
  const selectedCategory = 'История';

  return (
    <Box sx={{ display: 'flex', pt: 8 }}>
      <Helmet>
        <title>GeekTube | История</title>
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
        <Typography>History</Typography>
      </Box>
    </Box>
  );
};

export default History;
