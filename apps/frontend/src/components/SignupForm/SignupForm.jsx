import React, { useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo } from '@constants/frontend';
import styles from './SignupForm.module.scss';
import AuthController from '../../controllers/AuthController';
import { nanoid } from 'nanoid';

const SignupForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }
  const handlePassChange = (evt) => {
    setPassword(evt.target.value);
  }
  const handlePassChange2 = (evt) => {
    setPassword2(evt.target.value);
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (password === password2) {
      const username = email.split('@')[0] + nanoid(10);
      try {
        await AuthController.registration(username, email, password);
      } catch {
        console.log('Registration failed');
      }
      setPassword('');
      setPassword2('');
      setEmail('');
    } else {
      console.log('Passwords not equal');
    }
  }

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
          onSubmit={handleSubmit}
          className={styles.signupForm}
        >
          <h3>Создайте свой аккаунт</h3>
          <Stack className={styles.inputStuck}>
            <input
              placeholder="E-mail"
              name="email"
              type="email"
              onChange={handleEmailChange}
              value={email}
              className={styles.signupInput}
            />

            <input
              placeholder="Придумайте пароль"
              name="password"
              type="password"
              onChange={handlePassChange}
              value={password}
              className={styles.signupInput}
            />

            <input
              placeholder="Повторите пароль"
              name="password2"
              type="password"
              onChange={handlePassChange2}
              value={password2}
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
