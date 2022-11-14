import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { loginHandler } from '../../features/auth/authSlice';
import styles from './LoginForm.module.scss';
import { Stack, Typography } from '@mui/material';
import { LoginFormElemButton } from './LoginFormElemButton';
import { LoginFormElemInputError } from './LoginFormElemInputError';
import { LoginFormStatusError } from './LoginFormStatusError';
import { EMAIL, PASSWORD } from '@constants/frontend';

export const LoginFormElem = () => {
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

  const { register, handleSubmit, formState: { errors, isValid }, reset,} = useForm({
    mode: 'onBlur',
    defaultValues: { [EMAIL]: '', [PASSWORD]: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
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
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Войдите в свой аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <Stack
          className={styles.inputStuck}
          sx={{ backgroundColor: 'shadows.main' }}
        >
          <input
            {...register(EMAIL)}
            placeholder="E-mail"
            type="email"
            className={styles.loginInput}
          />
          <LoginFormElemInputError errors={errors} type={EMAIL}/>

          <input
            {...register(PASSWORD)}
            placeholder="Пароль"
            type="password"
            className={styles.loginInput}
          />
          <LoginFormElemInputError errors={errors} type={PASSWORD}/>

        </Stack>

        <div className={styles.buttonWrap}>
          <LoginFormStatusError loginError={loginError}/>
          <LoginFormElemButton isValid={isValid}/>
        </div>
      </form>
    </>
  );
}
