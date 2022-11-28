import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { Header, Navbar, VideoGrid } from '../';

import styles from './MainPage.module.scss';

import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { useNavigate, useParams } from 'react-router-dom';
import { VIDEO } from '@constants/frontend';
import GetChildrenController from '../../controllers/GetChildrenController';
import Loader from '../Loader/Loader';

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const MainPage = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('Домой');

  return (
    <Box sx={{ display: 'flex' }}>
      <Header withNavbar />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: 'darkBackground.main' }}
      >
        {/* <Box
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
        </Box> */}

        <div style={{ color: 'white' }}>Home</div>

        <Box p={2} sx={{ maxHeight: '93vh', flex: 2 }}>
          <VideoGrid />
        </Box>

        <DrawerHeader />
      </Box>
    </Box>
  );
};

export default MainPage;
