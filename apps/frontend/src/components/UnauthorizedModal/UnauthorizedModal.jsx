import { Box, Grow, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import styles from './UnauthorizedModal.module.scss'

const UnauthorizedModal = ({isAuth}) => {
  const theme = useTheme();

  return (
    <Grow in={isAuth} {...(isAuth ? { timeout: 800 } : {})}>
      <Box
        className={styles.modalWindow}
        sx={{
          boxShadow: `0 1px 2px ${theme.palette.shadows.main}`,
          backgroundColor: theme.palette.shadows.main,
        }}
      >
        <Typography className={styles.modalContent} variant={'h6'}>
          Доступно зарегистрированным пользователям
        </Typography>
      </Box>
    </Grow>
  );
};

export default UnauthorizedModal;
