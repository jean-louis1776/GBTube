import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { logo, userMenu } from '@constants/frontend';

import styles from './Header.module.scss';

import { SearchForm, UserMenu } from '../';

const Header = (props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: 'sticky',
        top: 0,
        justifyContent: 'space-between',
        boxShadow: '0 8px 6px -6px #ccc',
      }}
      className={styles.header}
    >
      <Tooltip title="Домашняя страница GeekTube">
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.logo}
        >
          <img src={logo} alt="Home" height={45} />

          <Typography
            className={styles.logoName}
            variant="h4"
            fontWeight="bold"
            sx={{ color: '#000', ml: 1 }}
          >
            Geek<span style={{ color: '#fc1503' }}>Tube</span>
          </Typography>
        </Link>
      </Tooltip>

      <Stack direction="row" alignItems="center" sx={{ gap: '1rem' }}>
        <SearchForm />

        <Link to="/login">
          <Button variant="outlined" color="red">
            Войти
          </Button>
        </Link>

        <UserMenu />
      </Stack>
    </Stack>
  );
};

export default Header;
