import React from 'react';
import { RedirectLogo } from '@constants/frontend';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import styles from './EmailConfirm.module.scss';

const EmailConfirm = (props) => {
  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100%',
        justifyContent: 'center',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      <Helmet>
        <title>Почта подтверждена | GeekTube</title>
      </Helmet>
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
          <img src={RedirectLogo} alt="404 Logo" style={{ width: '18.5rem' }} />
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
            sx={{ fontSize: '3.5rem', lineHeight: 1, fontWeight: 600 }}
          >
            Наши поздравления!
          </Typography>
          <Typography
            sx={{
              fontWeight: 300,
              fontSize: '2rem',
              mb: 4,
              mt: 4,
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            Ваша учетная запись была <br /> успешно подтверждена
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

      <Box
        sx={{
          width: '400px',
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          marginLeft: '-200px',
        }}
      >
        <Typography sx={{ color: '#999', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} GeekTube Team. Все права защищены
        </Typography>
      </Box>
    </Stack>
  );
};

export default EmailConfirm;
