import styles from './LoginForm.module.scss';
import React from 'react';

export const LoginFormStatusError = ({loginError}) => {
  return (
    loginError !== '' ? <p className={styles.error}>{loginError}</p> : ''
  );
}
