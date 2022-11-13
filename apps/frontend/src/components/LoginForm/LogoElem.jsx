import { Link } from 'react-router-dom';
import styles from './LoginForm.module.scss';
import { logo } from '@constants/frontend';
import { Typography } from '@mui/material';
import React from 'react';

export const LogoElem = () => {
  return (
    <Link to="/" className={styles.loginLogo}>
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
  );
}
