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
import { Link, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { logo } from '@constants/frontend';
import { Navbar, SearchForm, UserMenu } from '../';
import { AppBar, DrawerHeader } from './HeaderComponents';
import styles from './Header.module.scss';
import { getAuthStatus } from '../../store/selectors';
import AuthController from '../../controllers/AuthController';
import {
  setAccessToken,
  setAuthStatus,
  setId,
  setNickName,
} from '../../store/slice';
import UnauthorizedModal from '../UnauthorizedModal/UnauthorizedModal';

const Header = ({ selectedCategory }) => {
  const isAuth = useSelector(getAuthStatus, shallowEqual);
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

  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();

  const handleListItemClick = (link) => () => {
    if (isAuth || link === '/') {
      navigate(`${link}`);
      toggleDrawer(false);
    } else {
      setUnauthorized((prev) => !prev);
      setTimeout(() => setUnauthorized((prev) => !prev), 2000);
    }
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
              <UserMenu />
            ) : (
              <Link to="/login">
                <Button variant="outlined" color="baseBlue">
                  Войти
                </Button>
              </Link>
            )}
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

        <Navbar
          // toggle={toggleDrawer(false)}
          selectCat={selectedCategory}
          handleListItemClick={handleListItemClick}
        />

        <Typography
          sx={{
            width: '100%',
            position: 'absolute',
            bottom: '10px',
            textAlign: 'center',
            opacity: 0.6,
            userSelect: 'none',
          }}
        >
          &copy; {new Date().getFullYear()} GeekTube Team. <br /> Все права
          защищены
        </Typography>
      </Drawer>

      <UnauthorizedModal isAuth={unauthorized} />
    </>
  );
};

export default Header;
