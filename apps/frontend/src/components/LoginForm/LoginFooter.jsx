import styles from './LoginForm.module.scss';
import React from 'react';

export const LoginFooter = () => {
  return (
    <p className={styles.copyright}>
      &copy; {new Date().getFullYear()} GeekTube Team. Все права защищены
    </p>
  );
}
