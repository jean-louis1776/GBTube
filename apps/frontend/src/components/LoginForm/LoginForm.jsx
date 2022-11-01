import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo } from '@constants/frontend';

import styles from './LoginForm.module.scss';

const LoginForm = (props) => {
  return (
    <Stack className={styles.loginSection}>
      <Paper elevation={3} className={styles.loginPaper}>
        <Link to="/" className={styles.loginLogo}>
          <img src={logo} alt="Logo" height={45} />

          <Typography
            className={styles.logoName}
            variant="h4"
            fontWeight="bold"
            sx={{ color: '#000', ml: 1 }}
          >
            Geek<span style={{ color: '#fc1503' }}>Tube</span>
          </Typography>
        </Link>

        <form
          // onSubmit={handleSubmit}
          className={styles.loginForm}
        >
          <h3>Войдите в свой аккаунт</h3>
          <Stack className={styles.inputStuck}>
            <input
              placeholder="E-mail"
              name="email"
              type="email"
              // onChange={handleEmailChange}
              // value={email}
              className={styles.loginInput}
            />

            <input
              placeholder="Пароль"
              name="password"
              type="password"
              // onChange={handlePassChange}
              // value={password}
              className={styles.loginInput}
            />
          </Stack>

          <div>
            {/* {error && (
              <p className={classes.error}>
                Ошибка: такого аккаунта не существует
              </p>
            )} */}
            <Button type="submit" color="red" variant="contained">
              Войти
            </Button>
          </div>
          <p className={styles.redirect}>
            Ещё нет аккаунта?{' '}
            <Link to="/signup">
              <span style={{ color: '#fc1503' }}>Создайте аккаунт</span>
            </Link>
          </p>
        </form>

        <p className={styles.copyright}>
          &copy; 2022 GeekTube Team. Все права защищены
        </p>
      </Paper>
    </Stack>
  );
};

export default LoginForm;
