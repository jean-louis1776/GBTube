import { Box, Button, Stack, Typography } from '@mui/material';
import PasswordValidator from 'password-validator';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import UserController from '../../controllers/UsersController';

import styles from './Password.module.scss';

const Password = ({ userId }) => {
  const [handleStatusOk, setHandleStatusOk] = useState(false);
  const [passwordShownOld, setPasswordShownOld] = useState(false);
  const [passwordShownFirst, setPasswordShownFirst] = useState(false);
  const [passwordShownSecond, setPasswordShownSecond] = useState(false);

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
    passwordOld: yup
      .string()
      .trim()
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .test(
        'checkPass',
        'Пароль не соответствует требованиям сложности',
        (psw) => schemaPsw.validate(psw)
      )
      .required('Поле Пароль обязательно к заполнению'),
    passwordNew1: yup
      .string()
      .trim()
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .test(
        'checkPass',
        'Пароль не соответствует требованиям сложности',
        (psw) => schemaPsw.validate(psw)
      )
      .notOneOf(
        [yup.ref('passwordOld')],
        'Новый пароль должен отличаться от старого'
      )
      .required('Поле Пароль обязательно к заполнению'),
    passwordNew2: yup
      .string()
      .oneOf([yup.ref('passwordNew1')], 'Пароли не совпадают')
      .required('Повторить Пароль обязательно'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { passwordOld: '', passwordNew1: '', passwordNew2: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ passwordOld, passwordNew1 }) => {
    try {
      await UserController.changePassword(userId, passwordOld, passwordNew1);
      setHandleStatusOk(true);
      reset();
    } catch (err) {
      setHandleStatusOk(false);
      console.log('Failed change password');
      console.log(err);
    }
  };

  const togglePasswordOld = () => {
    setPasswordShownOld(!passwordShownOld);
  };
  const togglePasswordFirst = () => {
    setPasswordShownFirst(!passwordShownFirst);
  };
  const togglePasswordSecond = () => {
    setPasswordShownSecond(!passwordShownSecond);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.passForm}>
      {handleStatusOk ? (
        <Typography
          variant="h6"
          textAlign="center"
          mb={2}
          sx={{ userSelect: 'none' }}
        >
          Успешно изменено
        </Typography>
      ) : (
        ''
      )}
      <Stack sx={{ width: '100%', mb: 3 }}>
        <Box className={styles.passInputBox}>
          <input
            {...register('passwordOld')}
            placeholder="Введите текущий пароль"
            type={passwordShownOld ? 'text' : 'password'}
            className={styles.passInput}
          />

          <div className={styles.passToggle} onClick={togglePasswordOld}>
            {passwordShownOld === false ? (
              <VisibilityIcon sx={{ color: 'baseBlue.main' }} />
            ) : (
              <VisibilityOffIcon sx={{ color: 'baseBlue.main' }} />
            )}
          </div>
        </Box>

        {errors?.passwordOld && (
          <p className={styles.error}>
            {errors?.passwordOld?.message || 'Err!!!!!'}
          </p>
        )}

        <Box className={styles.passInputBox}>
          <input
            {...register('passwordNew1')}
            placeholder="Придумайте новый пароль"
            type={passwordShownFirst ? 'text' : 'password'}
            className={styles.passInput}
          />

          <div className={styles.passToggle} onClick={togglePasswordFirst}>
            {passwordShownFirst === false ? (
              <VisibilityIcon sx={{ color: 'baseBlue.main' }} />
            ) : (
              <VisibilityOffIcon sx={{ color: 'baseBlue.main' }} />
            )}
          </div>
        </Box>

        {errors?.passwordNew1 && (
          <p className={styles.error}>
            {errors?.passwordNew1?.message || 'Err!!!!!'}
          </p>
        )}

        <Box className={styles.passInputBox}>
          <input
            {...register('passwordNew2')}
            placeholder="Повторите новый пароль"
            type={passwordShownSecond ? 'text' : 'password'}
            className={styles.passInput}
          />

          <div className={styles.passToggle} onClick={togglePasswordSecond}>
            {passwordShownSecond === false ? (
              <VisibilityIcon sx={{ color: 'baseBlue.main' }} />
            ) : (
              <VisibilityOffIcon sx={{ color: 'baseBlue.main' }} />
            )}
          </div>
        </Box>

        {errors?.passwordNew2 && (
          <p className={styles.error}>
            {errors?.passwordNew2?.message || 'Err!!!!!'}
          </p>
        )}
      </Stack>

      <Button
        type="submit"
        color="baseBlue"
        variant="contained"
        disabled={!isValid}
      >
        Сохранить
      </Button>
    </form>
  );
};

export default Password;
