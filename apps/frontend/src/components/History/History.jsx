import React, { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { Header } from '../';
import SearchHistoryForm from './SearchHistoryForm';
import VideoListItem from '../VideoListItem/VideoListItem';

import styles from './History.module.scss';

const History = (props) => {
  const selectedCategory = 'История';

  const listId = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <>
      <Helmet>
        <title>GeekTube | История</title>
      </Helmet>

      <Header selectedCategory={selectedCategory} />

      <Box className={styles.historyWrapper}>
        <Box component="main" className={styles.historyMain}>
          <Typography className={styles.historyTitle} variant="h4">
            История просмотров
          </Typography>

          <SearchHistoryForm />

          {listId.map((index) => (
            <Box key={index} className={styles.linkCard}>
              <Link to={`/videoDetail`}>
                <VideoListItem />
              </Link>
              <Divider className={styles.divider} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default History;
