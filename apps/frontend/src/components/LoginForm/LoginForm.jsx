import React, { useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '@constants/frontend';
import AuthController from '../../controllers/AuthController';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePassChange = (evt) => {
    setPassword(evt.target.value);
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await AuthController.login(email, password);
      navigate('/');
    } catch {
      console.log('Login failed');
    }
    setPassword('');
    setEmail('');
  };

  return (
    <Stack className={styles.loginSection}>
      <Paper elevation={3} className={styles.loginPaper}>
        <Link to="/" className={styles.loginLogo}>
          <img src={logo} alt="Logo" height={45} />

          <Typography
            className={styles.logoName}
            variant="h4"
            fontWeight="bold"
            sx={{ ml: 1 }}
          >
<<<<<<< HEAD
            Geek<span style={{ color: '#0089EB' }}>Tube</span>
=======
            Geek
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: 'baseBlue.main',
                display: 'inline',
                fontSize: '1.5rem',
              }}
            >
              Tube
            </Typography>
>>>>>>> 0c085dda2cd3537101afa8ddb8795702b5d8ef9a
          </Typography>
        </Link>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Войдите в свой аккаунт
          </Typography>
          <Stack
            className={styles.inputStuck}
            sx={{ backgroundColor: 'shadows.main' }}
          >
            <input
              placeholder="E-mail"
              name="email"
              type="email"
              onChange={handleEmailChange}
              value={email}
              className={styles.loginInput}
            />

            <input
              placeholder="Пароль"
              name="password"
              type="password"
              onChange={handlePassChange}
              value={password}
              className={styles.loginInput}
            />
          </Stack>

          <div>
            {/* {error && (
              <p className={classes.error}>
                Ошибка: такого аккаунта не существует
              </p>
            )} */}
            <Button type="submit" color="baseBlue" variant="contained">
              Войти
            </Button>
          </div>
<<<<<<< HEAD
          <p className={styles.redirect}>
            Ещё нет аккаунта?{' '}
            <Link to="/signup">
              <span style={{ color: '#0089EB' }}>Создайте аккаунт</span>
            </Link>
          </p>
=======
          <Typography className={styles.redirectText}>
            Ещё нет аккаунта?
          </Typography>
          <Link to="/signup">
            <Typography
              sx={{ color: 'baseBlue.main' }}
              className={styles.redirectUrl}
            >
              Создайте аккаунт
            </Typography>
          </Link>
>>>>>>> 0c085dda2cd3537101afa8ddb8795702b5d8ef9a
        </form>

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} GeekTube Team. Все права защищены
        </p>
      </Paper>
    </Stack>
  );
};

export default LoginForm;
