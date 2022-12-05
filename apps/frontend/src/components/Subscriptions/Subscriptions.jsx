import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { Header } from '../';
import SearchSubForm from './SearchSubForm';
import VideoCard from '../VideoCard/VideoCard';

import styles from './Subscriptions.module.scss';

const Subscriptions = (props) => {
  const selectedCategory = 'Мои подписки';

  const listId = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <>
      <Header selectedCategory={selectedCategory} />

      <Box className={styles.subWrapper}>
        <Box component="main" className={styles.subMain}>
          <Typography className={styles.subTitle} variant="h4">
            Мои подписки
          </Typography>

          <SearchSubForm />
          {/*
          <Box className={styles.likesGrid}>
            {listId.map((index) => (
              <VideoCard key={index} />
            ))}
          </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default Subscriptions;
