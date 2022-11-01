import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { Header, Navbar } from '../';

import styles from './Likes.module.scss';

const Likes = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('Понравившиеся');

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

        <div>Likes</div>
      </Stack>
    </>
  );
};

export default Likes;
