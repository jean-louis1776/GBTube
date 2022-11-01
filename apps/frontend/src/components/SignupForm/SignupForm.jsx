import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo } from '@constants/frontend';

import styles from './SignupForm.module.scss';

const SignupForm = (props) => {
  return (
    <Stack className={styles.signupSection}>
      <Paper elevation={3} className={styles.signupPaper}>
        <Link to="/" className={styles.signupLogo}>
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
          className={styles.signupForm}
        >
          <h3>Создайте свой аккаунт</h3>
          <Stack className={styles.inputStuck}>
            <input
              placeholder="E-mail"
              name="email"
              type="email"
              // onChange={handleEmailChange}
              // value={email}
              className={styles.signupInput}
            />

            <input
              placeholder="Придумайте пароль"
              name="password"
              type="password"
              // onChange={handlePassChange}
              // value={password}
              className={styles.signupInput}
            />

            <input
              placeholder="Повторите пароль"
              name="password"
              type="password"
              // onChange={handlePassChange}
              // value={password}
              className={styles.signupInput}
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
          <p className={styles.redirect}>
            Уже есть аккаунт?{' '}
            <Link to="/login">
              <span style={{ color: '#fc1503' }}>Войдите в аккаунт</span>
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

export default SignupForm;
