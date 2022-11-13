import { Typography } from '@mui/material';
import styles from './LoginForm.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';

export const SignUpRedirectElem = () => {
  return (
    <>
      <Typography className={styles.redirectText}>
        Ещё нет аккаунта?
      </Typography>
      <Link to="/signup">
        <Typography
          sx={{ color: 'baseBlue.main' }}
          className={styles.redirectUrl}
        >
          Создайте аккаунт
        </Typography>
      </Link>
    </>
  );
}
