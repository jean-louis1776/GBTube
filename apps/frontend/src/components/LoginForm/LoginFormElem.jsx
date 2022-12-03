import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// import { loginHandler } from '../../features/auth/authSlice';
import styles from './LoginForm.module.scss';
import { Box, Stack, Typography } from '@mui/material';
import { LoginFormElemButton } from './LoginFormElemButton';
import { LoginFormElemInputError } from './LoginFormElemInputError';
import { LoginFormStatusError } from './LoginFormStatusError';
import { EMAIL, PASSWORD } from '@constants/frontend';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AuthController from '../../controllers/AuthController';
import { setAccessToken, setAuthStatus, setId, setNickName } from '../../store/slice';

export const LoginFormElem = () => {
  const [loginError, setLoginError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

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
    defaultValues: { [EMAIL]: '', [PASSWORD]: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const { data } = await AuthController.login(email, password);
      if (data.isBanned) {
        localStorage.setItem('token', '');
        dispatch(setAuthStatus(false));
        dispatch(setAccessToken(''));
        dispatch(setId(''));
        dispatch(setNickName(''));
        setLoginError('Пользователь заблокирован');
        return;
      }
      localStorage.setItem('token', data.accessToken);
      dispatch(setAuthStatus(true));
      dispatch(setAccessToken(data.accessToken));
      dispatch(setId(data.id));
      dispatch(setNickName(data.nickName));
      setLoginError('');
      reset();
      navigate(-1, { replace: true });
    } catch (err) {
      setLoginError('Ошибка авторизации. Неверен логин или пароль');
      console.log('Login failed');
      console.log(err);
    }
    // try {
    //   dispatch(loginHandler({ email, password }));
    //   setLoginError('');
    //   navigate('/', { replace: true });
    // } catch {
    //   setLoginError('Ошибка авторизации. Неверен логин или пароль');
    //   console.log('Login failed');
    // }
  };

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
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
          <Box className={styles.loginInputBox}>
            <input
              {...register(EMAIL)}
              placeholder="E-mail"
              type="email"
              className={styles.loginInput}
            />
          </Box>

          <LoginFormElemInputError errors={errors} type={EMAIL} />

          <Box className={`${styles.loginInputBox} ${styles.passwordBox}`}>
            <input
              {...register(PASSWORD)}
              placeholder="Пароль"
              type={passwordShown ? 'text' : 'password'}
              className={styles.loginInput}
            />

            <div className={styles.passToggle} onClick={togglePassword}>
              {passwordShown === false ? (
                <VisibilityIcon sx={{ color: 'baseBlue.main' }} />
              ) : (
                <VisibilityOffIcon sx={{ color: 'baseBlue.main' }} />
              )}
            </div>
          </Box>

          <LoginFormElemInputError errors={errors} type={PASSWORD} />
        </Stack>

        <div className={styles.buttonWrap}>
          <LoginFormStatusError loginError={loginError} />
          <LoginFormElemButton isValid={isValid} />
        </div>
      </form>
    </>
  );
};
