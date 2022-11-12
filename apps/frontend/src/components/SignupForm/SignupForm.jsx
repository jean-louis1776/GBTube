import React from 'react';
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
      .min(8, 'Требуется не менее 8 символов в поле Пароль')
      .test(
        'checkPass',
        'Пароль не соответствует требованиям сложности',
        (psw) => schemaPsw.validate(psw)
      )
      .required('Поле Пароль обязательно к заполнению'),
    password2: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
      .required('Поле Пароль обязательно к заполнению'),
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

  const onSubmit = async (evt) => {
    const formData = new FormData(evt.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const username = email.split('@')[0] + nanoid(10);
    try {
      // await AuthController.registration(username, email, password);
      dispatch(registrationHandler({ username, email, password }));
      navigate('/', { replace: true });
    } catch {
      console.log('Registration failed');
    }
    reset();
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

        <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Создайте свой аккаунт
          </Typography>
          <Stack
            className={styles.inputStuck}
            sx={{ backgroundColor: 'shadows.main' }}
          >
            <input
              {...register('email', {
                required: 'Поле E-mail обязательно к заполнению',
                minLength: {
                  value: 1,
                  message: 'Требуется не менее 1 символа в поле E-mail',
                },
              })}
              placeholder="E-mail"
              type="email"
              className={styles.signupInput}
            />

            <input
              {...register('password', {
                required: 'Поле Пароль обязательно к заполнению',
                minLength: {
                  value: 8,
                  message: 'Требуется не менее 8 символов в поле Пароль',
                },
              })}
              placeholder="Придумайте пароль"
              type="password"
              className={styles.signupInput}
            />

            <input
              {...register('password2', {
                required: 'Поле Пароль обязательно к заполнению',
                minLength: {
                  value: 8,
                  message: 'Требуется не менее 8 символов в поле Пароль',
                },
              })}
              placeholder="Повторите пароль"
              type="password"
              className={styles.signupInput}
            />
          </Stack>

          <div>
            <div className={styles.copyright}>
              {errors?.email && <p>{errors?.email?.message || 'Err!!!!!'}</p>}
            </div>
            <div className={styles.copyright}>
              {errors?.password && (
                <p>{errors?.password?.message || 'Err!!!!!'}</p>
              )}
            </div>
            <div className={styles.copyright}>
              {errors?.password2 && (
                <p>{errors?.password2?.message || 'Err!!!!!'}</p>
              )}
            </div>

            <Button
              type="submit"
              color="baseBlue"
              variant="contained"
              disabled={!isValid}
            >
              Зарегистрироваться
            </Button>
          </div>
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
