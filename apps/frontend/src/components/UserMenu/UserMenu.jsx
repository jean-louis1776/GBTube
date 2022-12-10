import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deepOrange } from '@mui/material/colors';
import { userMenu } from '@constants/frontend';

import styles from './UserMenu.module.scss';
import AuthController from '../../controllers/AuthController';
import {
  setAccessToken,
  setAuthStatus,
  setId,
  setNickName,
} from '../../store/slice';
import { getAuthStatus, getNickName, getUserId } from '../../store/selectors';
import UnauthorizedModal from '../UnauthorizedModal/UnauthorizedModal';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();
  // const user = useSelector(getSelector('userProfile', 'user'), shallowEqual);
  const userId = useSelector(getUserId, shallowEqual);
  const nickName = useSelector(getNickName, shallowEqual);
  const isAuth = useSelector(getAuthStatus, shallowEqual);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('user');
  //   console.log(user);
  // }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuClick = (link) => () => {
    if (isAuth && userId) {
      navigate(`${link}/get_all/${userId}`, {
        state: { idList: [`${userId}`] },
      });
    } else {
      setUnauthorized((prev) => !prev);
      setTimeout(() => setUnauthorized((prev) => !prev), 2000);
    }
  };

  const handleUserProfileClick = (link) => () => {
    if (isAuth && userId) {
      navigate(`${link}/${userId}`, {
        state: { idList: [`${userId}`] },
      });
    } else {
      setUnauthorized((prev) => !prev);
      setTimeout(() => setUnauthorized((prev) => !prev), 2000);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await AuthController.logout();
      localStorage.removeItem('token');
      dispatch(setAuthStatus(false));
      dispatch(setAccessToken(''));
      dispatch(setId(''));
      dispatch(setNickName(''));
      navigate('/', { replace: true });
      console.log('logout successful');
    } catch (err) {
      console.log('logout fail');
      console.log(err);
    }
  };

  return (
    <>
      <Tooltip title="Аккаунт">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: isAuth ? 'baseBlue.main' : deepOrange[500],
            }}
          />
        </IconButton>
      </Tooltip>

      {/* Menu section */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '& .MuiMenu-list': {
              p: 0,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: 'shadows.main',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuth ? (
          <MenuItem
            sx={{ color: deepOrange[500] }}
            onClick={handleUserProfileClick('/userProfile')}
          >
            {nickName || 'Где ник?'}
          </MenuItem>
        ) : (
          ''
        )}
        <MenuItem
          sx={{ py: 2 }}
          onClick={handleUserProfileClick('/userProfile')}
        >
          <Avatar
            sx={{
              bgcolor: 'baseBlue.main',
            }}
          />
          <Typography>Мой профиль</Typography>
        </MenuItem>

        <Divider className={styles.divider} />

        {userMenu.map((userMenu, index) =>
          userMenu.name !== 'Выйти' ? (
            <Box onClick={handleUserMenuClick(userMenu.link)} key={index}>
              <MenuItem sx={{ pt: 1.25, pb: 1.25 }}>
                <ListItemIcon>{userMenu.icon}</ListItemIcon>
                <ListItemText>{userMenu.name}</ListItemText>
              </MenuItem>
            </Box>
          ) : (
            userMenu.name === 'Войти' || (
              <Link to="/login" key={index}>
                <Box onClick={handleLogoutClick}>
                  <MenuItem sx={{ pt: 1.25, pb: 1.25 }}>
                    <ListItemIcon>{userMenu.icon}</ListItemIcon>
                    <ListItemText>
                      {isAuth && userId ? userMenu.name : userMenu.altName}
                    </ListItemText>
                  </MenuItem>
                </Box>
              </Link>
            )
          )
        )}
      </Menu>
      <UnauthorizedModal isAuth={unauthorized} />
    </>
  );
};

export default UserMenu;
