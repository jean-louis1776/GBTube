import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo } from '../../utils/constants';

import './SignupForm.scss';

const SignupForm = (props) => {
  return (
    <Stack className="signup-section">
      <Paper elevation={3} className="signup-paper">
        <Link to="/" className="signup-logo">
          <img src={logo} alt="Logo" height={45} />

          <Typography
            className="logo-name"
            variant="h4"
            fontWeight="bold"
            sx={{ color: '#000', ml: 1 }}
          >
            Geek<span style={{ color: '#fc1503' }}>Tube</span>
          </Typography>
        </Link>

        <form
          // onSubmit={handleSubmit}
          className="signup-form"
        >
          <h3>Создайте свой аккаунт</h3>
          <Stack className="input-stuck">
            <input
              placeholder="E-mail"
              name="email"
              type="email"
              // onChange={handleEmailChange}
              // value={email}
              className="signup-input"
            />

            <input
              placeholder="Придумайте пароль"
              name="password"
              type="password"
              // onChange={handlePassChange}
              // value={password}
              className="signup-input"
            />

            <input
              placeholder="Повторите пароль"
              name="password"
              type="password"
              // onChange={handlePassChange}
              // value={password}
              className="signup-input"
            />
          </Stack>

          <div>
            {/* {error && (
              <p className={classes.error}>
                Ошибка: такого аккаунта не существует
              </p>
            )} */}
            <Button type="submit" color="red" variant="contained">
              Зарегистрироваться
            </Button>
          </div>
          <p className="redirect">
            Уже есть аккаунт?{' '}
            <Link to="/login">
              <span style={{ color: '#fc1503' }}>Войдите в аккаунт</span>
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

export default SignupForm;
