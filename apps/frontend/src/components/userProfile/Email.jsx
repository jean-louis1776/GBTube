import { Box, Button, Stack, Typography } from '@mui/material';
import styles from '../SignupForm/SignupForm.module.scss';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import UserController from '../../controllers/UsersController';

const Email = ({currentEmail, refreshData, userId}) => {
  const [handleStatusOk, setHandleStatusOk] = useState(false);
  const schema = yup.object({
    email1: yup
      .string()
      .trim()
      .email('Введённый E-mail некорректен')
      .notOneOf([currentEmail], 'Новый пароль должен отличаться от старого')
      .required('Поле E-mail обязательно к заполнению'),
    email2: yup
      .string()
      .trim()
      .oneOf([yup.ref('email1')], 'E-mail не совпадают')
      .required('Повторить E-mail обязательно'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { email1: '', email2: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({email1}) => {
    try {
      await UserController.changeEmail(userId, email1);
      setHandleStatusOk(true);
      reset();
      refreshData();
    } catch (err) {
      setHandleStatusOk(false);
      console.log('Failed change email');
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
      {handleStatusOk ? <Typography>Успешно заменено</Typography> : ''}
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
        mt={3}
        sx={{ '& .MuiTextField-root': { m: 1, width: '60ch' } }}
      >

        <Box className={styles.signupInputBox}>
          <input {...register('email1')} type='email' placeholder="Новый E-mail" />
        </Box>

        {errors?.email1 && (
          <p className={styles.error}>
            {errors?.email1?.message || 'Err!!!!!'}
          </p>
        )}

        <Box className={styles.signupInputBox}>
          <input {...register('email2')} type='email' placeholder="Повтор нового E-mail" />
        </Box>

        {errors?.email2 && (
          <p className={styles.error}>
            {errors?.email2?.message || 'Err!!!!!'}
          </p>
        )}
        <Button
          type="submit"
          color="baseBlue"
          variant="contained"
          disabled={!isValid}
        >
          Сохранить
        </Button>
      </Stack>
    </form>
  );
}

export default Email;
