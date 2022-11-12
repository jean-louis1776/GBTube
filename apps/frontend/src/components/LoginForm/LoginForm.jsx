import React, { useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '@constants/frontend';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../../features/auth/authSlice';
// import AuthController from '../../controllers/AuthController';

import styles from './LoginForm.module.scss';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Введённый E-mail некорректен')
        .required('Поле E-mail обязательно к заполнению'),
      password: yup.string().required('Поле Пароль обязательно к заполнению'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      // await AuthController.login(email, password);
      dispatch(loginHandler({ email, password }));
      setLoginError('');
      navigate('/', { replace: true });
    } catch {
      setLoginError('Ошибка авторизации. Неверен логин или пароль');
      console.log('Login failed');
    }
    reset();
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
            sx={{ ml: 1, fontFamily: "'Titillium Web', sans-serif" }}
          >
            Geek
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: 'baseBlue.main',
                display: 'inline',
                fontSize: '1.5rem',
                fontFamily: "'Titillium Web', sans-serif",
              }}
            >
              Tube
            </Typography>
          </Typography>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Войдите в свой аккаунт
          </Typography>
          <Stack
            className={styles.inputStuck}
            sx={{ backgroundColor: 'shadows.main' }}
          >
            <input
              {...register('email')}
              placeholder="E-mail"
              type="email"
              className={styles.loginInput}
            />

            {errors?.email && (
              <p className={styles.error}>
                {errors?.email?.message || 'Err!!!!!'}
              </p>
            )}

            <input
              {...register('password')}
              placeholder="Пароль"
              type="password"
              className={styles.loginInput}
            />

            {errors?.password && (
              <p className={styles.error}>
                {errors?.password?.message || 'Err!!!!!'}
              </p>
            )}
          </Stack>

          <div className={styles.buttonWrap}>
            {loginError !== '' ? (
              <p className={styles.error}>{loginError}</p>
            ) : (
              ''
            )}

            <Button
              type="submit"
              color="baseBlue"
              variant="contained"
              disabled={!isValid}
            >
              Войти
            </Button>
          </div>

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
        </form>

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} GeekTube Team. Все права защищены
        </p>
      </Paper>
    </Stack>
  );
};

export default LoginForm;
