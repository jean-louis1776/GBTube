import React, { useEffect } from 'react';
import { Paper, Stack } from '@mui/material';
import { LogoElem } from './LogoElem';
import { SignUpRedirectElem } from './SignUpRedirectElem';
import { LoginFooter } from './LoginFooter';
import { LoginFormElem } from './LoginFormElem';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  useEffect(() => {
    document.title = 'GeekTube | Войти в аккаунт';
  }, []);

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
