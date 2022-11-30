import React from 'react';
import { Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';

import { LogoElem } from './LogoElem';
import { SignUpRedirectElem } from './SignUpRedirectElem';
import { LoginFooter } from './LoginFooter';
import { LoginFormElem } from './LoginFormElem';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  return (
    <Stack className={styles.loginSection}>
      <Helmet>
        <title>GeekTube | Войти в аккаунт</title>
      </Helmet>

      <Paper elevation={3} className={styles.loginPaper}>
        <LogoElem />
        <LoginFormElem />
        <SignUpRedirectElem />
        <LoginFooter />
      </Paper>
    </Stack>
  );
};

export default LoginForm;
