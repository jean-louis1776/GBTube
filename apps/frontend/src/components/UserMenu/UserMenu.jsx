import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';

// import styles from './UserMenu.module.scss';
import { blueGrey, deepOrange } from '@mui/material/colors';
import { userMenu } from '@constants/frontend';
import { getSelector } from '../../store/getSelector';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const user = useSelector(getSelector('userProfile', 'user'), shallowEqual);
  const isAuth = useSelector(getSelector('auth', 'isAuth'), shallowEqual);
  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log('user');
    console.log(user);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuClick = (link) => () => {
    if (isAuth && user.id) {
      navigate(`${link}/get_all/${user.id}`, {
        state: { idList: [`${user.id}`] },
      });
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
              bgcolor: isAuth ? deepOrange[500] : 'baseBlue.main',
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
          <MenuItem sx={{ color: deepOrange[500] }}>
            {user.nickName || 'Где ник?'}
          </MenuItem>
        ) : (
          ''
        )}
        <Link to="/userProfile">
          <MenuItem sx={{ py: 2 }}>
            <Avatar
              sx={{
                bgcolor: 'baseBlue.main',
              }}
            />
            <Typography>Мой профиль</Typography>
          </MenuItem>
        </Link>

        <Divider />

        {userMenu.map((userMenu, index) => (
          <Box onClick={handleUserMenuClick(userMenu.link)} key={index}>
            <MenuItem sx={{ pt: 1.25, pb: 1.25 }}>
              <ListItemIcon>{userMenu.icon}</ListItemIcon>
              <ListItemText>{userMenu.name}</ListItemText>
            </MenuItem>
          </Box>
        ))}
      </Menu>
    </>
  );
};

export default UserMenu;
