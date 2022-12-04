import React, { useEffect } from 'react';
import { Paper, Stack } from '@mui/material';
import { LogoElem } from './LogoElem';
import { SignUpRedirectElem } from './SignUpRedirectElem';
import { LoginFooter } from './LoginFooter';
import { LoginFormElem } from './LoginFormElem';
import styles from './LoginForm.module.scss';

useEffect(() => {
  document.title = 'GeekTube | Войти в аккаунт';
}, []);
const LoginForm = () => {
  return (
    <Stack className={styles.loginSection}>
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
