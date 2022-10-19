import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo } from '../../utils/constants';

import './LoginForm.scss';

const LoginForm = (props) => {
  return (
    <Stack className="login-section">
      <Paper elevation={3} className="login-paper">
        <div className="login-logo">
          <img src={logo} alt="Logo" height={45} />

          <Typography
            className="logo-name"
            variant="h4"
            fontWeight="bold"
            sx={{ color: '#000', ml: 1 }}
          >
            Geek<span style={{ color: '#fc1503' }}>Tube</span>
          </Typography>
        </div>

        <form
          // onSubmit={handleSubmit}
          className="login-form"
        >
          <h3>Войдите в свой аккаунт</h3>
          <Stack className="input-stuck">
            <input
              placeholder="E-mail"
              name="email"
              type="email"
              // onChange={handleEmailChange}
              // value={email}
              className="login-input"
            />

            <input
              placeholder="Пароль"
              name="password"
              type="password"
              // onChange={handlePassChange}
              // value={password}
              className="login-input"
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
          <p className="redirect">
            Ещё нет аккаунта?{' '}
            <Link to="/signup">
              <span style={{ color: '#fc1503' }}>Создайте аккаунт</span>
            </Link>
          </p>
        </form>

        <p className="copyright">
          &copy; 2022 GeekTube Team. Все права защищены
        </p>
      </Paper>
    </Stack>
  );
};

export default LoginForm;
