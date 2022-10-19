import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo } from '../../utils/constants';

import './Header.scss';

import SearchForm from '../SearchForm/SearchForm';

const Header = (props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: 'sticky',
        background: '#fff',
        top: 0,
        justifyContent: 'space-between',
        boxShadow: '0 8px 6px -6px #ccc',
      }}
    >
      <Link
        to="/"
        style={{ display: 'flex', alignItems: 'center' }}
        className="logo"
      >
        <img src={logo} alt="Home" height={45} />

        <Typography
          className="logo-name"
          variant="h4"
          fontWeight="bold"
          sx={{ color: '#000', ml: 1 }}
        >
          Geek<span style={{ color: '#fc1503' }}>Tube</span>
        </Typography>
      </Link>

      <Stack direction="row" alignItems="center">
        <SearchForm />

        <Link to="/login">
          <Button variant="outlined" color="red">
            Войти
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Header;
