import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { Header } from '../';
import SearchSubForm from './SearchSubForm';
import ChannelCard from '../ChannelCard/ChannelCard';

import styles from './Subscriptions.module.scss';

const Subscriptions = (props) => {
  const selectedCategory = 'Мои подписки';

  useEffect(() => {
    document.title = 'Мои подписки | GeekTube';
  }, []);

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

          <Box className={styles.likesGrid}>
            {listId.map((index) => (
              <ChannelCard key={index} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Subscriptions;
