import React from 'react';
import { notFoundLogo, notFoundBg } from '@constants/frontend';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound = (props) => {
  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${notFoundBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      <Box
        sx={{
          width: '1150px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <img src={notFoundLogo} alt="404 Logo" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{ textTransform: 'uppercase', fontSize: '4rem', lineHeight: 1 }}
          >
            Oops!
          </Typography>
          <Typography sx={{ fontWeight: 300, fontSize: '2rem', mb: 4 }}>
            Страница не найдена
          </Typography>
          <Link to="/">
            <Button
              variant="contained"
              sx={{ padding: '15px 25px', fontSize: '1rem', fontWeight: 600 }}
            >
              Вернуться на главную
            </Button>
          </Link>
        </Box>
      </Box>
    </Stack>
  );
};

export default NotFound;
