import React, { useState } from 'react';
import {
  Button,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { logo } from '@constants/frontend';
import { Navbar, SearchForm, UserMenu } from '../';
// import { getSelector } from '../../store/getSelector';
// import { logoutHandler } from '../../features/auth/authSlice';
import { AppBar, DrawerHeader } from './HeaderComponents';

import styles from './Header.module.scss';
import { getAuthStatus } from '../../store/selectors';
import AuthController from '../../controllers/AuthController';
import { setAccessToken, setAuthStatus, setId, setNickName } from '../../store/slice';

const Header = ({ selectedCategory }) => {
  const isAuth = useSelector(getAuthStatus, shallowEqual);
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(false);

  const toggleDrawer = (toggleOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenMenu(toggleOpen);
  };

  const handleLogoutClick = async () => {
    try {
      await AuthController.logout();
      localStorage.setItem('token', '');
      dispatch(setAuthStatus(false));
      dispatch(setAccessToken(''));
      dispatch(setId(''));
      dispatch(setNickName(''));
      console.log('logout successful');
    } catch (err) {
      console.log('logout fail');
      console.log(err);
    }
    // dispatch(logoutHandler());
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" className={styles.header}>
            <Tooltip title="Меню">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
                sx={{
                  marginRight: 3,
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Главная страница GeekTube">
              <Link to="/" className={styles.logo}>
                <img src={logo} alt="Logo" height={45} />

                <Typography
                  className={styles.logoName}
                  fontWeight="bold"
                  sx={{ ml: 1, fontFamily: "'Titillium Web', sans-serif" }}
                >
                  Geek
                </Typography>
                <Typography
                  fontWeight="bold"
                  sx={{
                    color: 'baseBlue.main',
                    display: 'inline',
                    fontSize: '1.5rem',
                    fontFamily: "'Titillium Web', sans-serif",
                  }}
                >
                  Tube
                </Typography>
              </Link>
            </Tooltip>
          </Stack>

          <Stack direction="row" alignItems="center" sx={{ gap: '1rem' }}>
            <SearchForm />

            {isAuth ? (
              <Button
                variant="outlined"
                color="baseBlue"
                onClick={handleLogoutClick}
              >
                Выйти
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outlined" color="baseBlue">
                  Войти
                </Button>
              </Link>
            )}

            <UserMenu />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* NAVBAR MENU */}

      <Drawer anchor="left" open={openMenu} onClose={toggleDrawer(false)}>
        <DrawerHeader sx={{ justifyContent: 'space-between' }}>
          <Typography
            sx={{
              pl: '12px',
              userSelect: 'none',
              fontWeight: 600,
              fontSize: '1.2rem',
            }}
          >
            Меню GeekTube
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Navbar toggle={toggleDrawer(false)} selectCat={selectedCategory} />
      </Drawer>
    </>
  );
};

export default Header;
