import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { logo, userMenu } from '@constants/frontend';

import styles from './Header.module.scss';

import { Navbar, SearchForm, UserMenu } from '../';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getSelector } from '../../store/getSelector';
import { logoutHandler } from '../../features/auth/authSlice';
import { AppBar, Drawer, DrawerHeader } from './HeaderComponents';

const Header = ({ withNavbar }) => {
  const isAuth = useSelector(getSelector('auth', 'isAuth'), shallowEqual);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const [openColl, setOpenColl] = useState(true);

  const handleDrawerOpen = () => {
    setOpenMenu(true);
  };

  const handleDrawerClose = () => {
    setOpenMenu(false);
  };

  const handleCollClick = () => {
    setOpenColl(!openColl);
  };

  const handleLogoutClick = () => {
    dispatch(logoutHandler());
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={openMenu}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" className={styles.header}>
            {withNavbar && (
              <Tooltip title="Меню">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 3,
                    ...(openMenu && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Домашняя страница GeekTube">
              <Link to="/" className={styles.logo}>
                <img src={logo} alt="Logo" height={45} />

                <Typography
                  className={styles.logoName}
                  variant="h4"
                  fontWeight="bold"
                  sx={{ ml: 1, fontFamily: "'Titillium Web', sans-serif" }}
                >
                  Geek
                  <Typography
                    variant="h4"
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

      {withNavbar && (
        <Drawer variant="permanent" open={openMenu}>
          <DrawerHeader sx={{ justifyContent: 'space-between' }}>
            <Typography sx={{ pl: '12px' }}>Панель навигации</Typography>
            <IconButton sx={{ color: '#fff' }} onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openMenu ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openMenu ? 3 : 'auto',
                      justifyContent: 'center',
                      color: 'baseBlue.main',
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ opacity: openMenu ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <List>
            <ListItemButton onClick={handleCollClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
              {openColl ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openColl} timeout="auto" unmountOnExit>
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: openColl ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: openColl ? 3 : 'auto',
                          justifyContent: 'center',
                          color: 'baseBlue.main',
                        }}
                      >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: openColl ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Header;
