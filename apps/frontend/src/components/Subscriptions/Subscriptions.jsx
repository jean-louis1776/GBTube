import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { Header, Navbar } from '../';

import styles from './Subscriptions.module.scss';

const Subscriptions = (props) => {
  const selectedCategory = 'Мои подписки';

  return (
    <Box sx={{ display: 'flex', pt: 8 }}>
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
        <Typography>Subscriptions</Typography>
      </Box>
    </Box>
  );
};

export default Subscriptions;
