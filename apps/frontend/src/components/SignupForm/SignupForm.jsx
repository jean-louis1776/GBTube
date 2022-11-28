import React, { useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '@constants/frontend';
import styles from './SignupForm.module.scss';
// import AuthController from '../../controllers/AuthController';
import { useDispatch } from 'react-redux';
import { registrationHandler } from '../../features/auth/authSlice';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';
import PasswordValidator from 'password-validator';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const schemaPsw = new PasswordValidator();
  schemaPsw
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']);

  const schema = yup.object({
    email: yup
      .string()
      .email('Введённый E-mail некорректен')
      .required('Поле E-mail обязательно к заполнению'),
    password: yup
      .string()
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .test(
        'checkPass',
        'Пароль не соответствует требованиям сложности',
        (psw) => schemaPsw.validate(psw)
      )
      .required('Поле Пароль обязательно к заполнению'),
    password2: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
      .required('Повторить Пароль обязательно'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { email: '', password: '', password2: '' },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = async ({ email, password }) => {
    const nickName = email.split('@')[0] + nanoid(10);
    try {
      // await AuthController.registration(username, email, password);
      dispatch(registrationHandler({ nickName, email, password }));
      navigate('/', { replace: true });
    } catch {
      console.log('Registration failed');
    }
    reset();
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  return (
    <Stack className={styles.signupSection}>
      <Paper elevation={3} className={styles.signupPaper}>
        <Link to="/" className={styles.signupLogo}>
          <img src={logo} alt="Logo" height={45} />

          <Typography
            className={styles.logoName}
            fontWeight="bold"
            sx={{ ml: 1, fontFamily: "'Titillium Web', sans-serif" }}
          >
            Geek
          </Typography>
          <Typography
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
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Создайте свой аккаунт
          </Typography>
          <Stack
            className={styles.inputStuck}
            sx={{ backgroundColor: 'shadows.main' }}
          >
            <input
              {...register('email')}
              placeholder="E-mail"
              type="email"
              className={styles.signupInput}
              value={email}
              onChange={handleChangeEmail}
            />

            {errors?.email && (
              <p className={styles.error}>
                {errors?.email?.message || 'Err!!!!!'}
              </p>
            )}

            <input
              {...register('password')}
              placeholder="Придумайте пароль"
              type="password"
              className={styles.signupInput}
              value={password}
              onChange={handleChangePassword}
            />

            {errors?.password && (
              <p className={styles.error}>
                {errors?.password?.message || 'Err!!!!!'}
              </p>
            )}

            <input
              {...register('password2')}
              placeholder="Повторите пароль"
              type="password"
              className={styles.signupInput}
            />

            {errors?.password2 && (
              <p className={styles.error}>
                {errors?.password2?.message || 'Err!!!!!'}
              </p>
            )}
          </Stack>

          <Button
            type="submit"
            color="baseBlue"
            variant="contained"
            disabled={!isValid}
          >
            Зарегистрироваться
          </Button>

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
        </form>

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} GeekTube Team. Все права защищены
        </p>
      </Paper>
    </Stack>
  );
};

export default SignupForm;
