import React from 'react';
import { Paper, Stack } from '@mui/material';
import styles from './LoginForm.module.scss';
import { LogoElem } from './LogoElem';
import { SignUpRedirectElem } from './SignUpRedirectElem';
import { LoginFooter } from './LoginFooter';
import { LoginFormElem } from './LoginFormElem';

const LoginForm = () => {
  return (
    <Stack className={styles.loginSection}>
      <Paper elevation={3} className={styles.loginPaper}>
        <LogoElem/>
        <LoginFormElem/>
        <SignUpRedirectElem/>
        <LoginFooter/>
      </Paper>
    </Stack>
  );
};

export default LoginForm;
