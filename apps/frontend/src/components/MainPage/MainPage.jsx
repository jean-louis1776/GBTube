import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { useNavigate, useParams } from 'react-router-dom';

import { Header, Navbar, VideoGrid } from '../';
import { VIDEO } from '@constants/frontend';
import GetChildrenController from '../../controllers/GetChildrenController';
import Loader from '../Loader/Loader';

import styles from './MainPage.module.scss';

const MainPage = (props) => {
  const selectedCategory = 'Домой';

  return (
    <>
      <Helmet>
        <title>GeekTube | Главная</title>
      </Helmet>

      <Box sx={{ display: 'flex' }}>
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
          <VideoGrid />
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
