import styles from './LoginForm.module.scss';
import React from 'react';

export const LoginFormElemInputError = ({errors, type}) => {
  return (
    errors[type] && (<p className={styles.error}>
      {errors[type]?.message || `Ошибка в ${type}` }
    </p>)
  );
}
