import React, { useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '@constants/frontend';
import styles from './SignupForm.module.scss';
import AuthController from '../../controllers/AuthController';
import { nanoid } from 'nanoid';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePassChange = (evt) => {
    setPassword(evt.target.value);
  };
  const handlePassChange2 = (evt) => {
    setPassword2(evt.target.value);
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (password === password2 && password.length > 0) {
      const username = email.split('@')[0] + nanoid(10);
      try {
        await AuthController.registration(username, email, password);
        navigate('/');
      } catch {
        console.log('Registration failed');
      }
      setPassword('');
      setPassword2('');
      setEmail('');
    } else {
      console.log('Passwords not equal');
    }
  };

  return (
    <Stack className={styles.signupSection}>
      <Paper elevation={3} className={styles.signupPaper}>
        <Link to="/" className={styles.signupLogo}>
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

        <form onSubmit={handleSubmit} className={styles.signupForm}>
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
            <Button type="submit" color="baseBlue" variant="contained">
              Зарегистрироваться
            </Button>
          </div>
<<<<<<< HEAD
          <p className={styles.redirect}>
            Уже есть аккаунт?{' '}
            <Link to="/login">
              <span style={{ color: '#0089EB' }}>Войдите в аккаунт</span>
            </Link>
          </p>
=======
          <Typography className={styles.redirectText}>
            Уже есть аккаунт?
          </Typography>
          <Link to="/login">
            <Typography
              sx={{ color: 'baseBlue.main' }}
              className={styles.redirectUrl}
            >
              Войдите в аккаунт
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

export default SignupForm;
