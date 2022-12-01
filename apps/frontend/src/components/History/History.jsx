import React, { useState } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { Header } from '../';
import SearchHistoryForm from './SearchHistoryForm';
import VideoListItem from '../VideoListItem/VideoListItem';
import { VIDEO } from '@constants/frontend';

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

      <Box sx={{ display: 'flex', pt: 8 }}>
        <Box
          component="main"
          sx={{
            bgcolor: 'darkBackground.main',
            py: 2,
            px: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, width: '100%', textAlign: 'left' }}
          >
            История просмотров
          </Typography>

          <SearchHistoryForm />

          {listId.map((index) => (
            <>
              <Link to={`/videoDetail`} key={index}>
                <VideoListItem />
              </Link>
              <Divider sx={{ width: '800px' }} />
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default History;
