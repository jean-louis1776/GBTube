import { Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import React, { useState } from 'react';
import styles from '../SignupForm/SignupForm.module.scss';
import UserController from '../../controllers/UsersController';
import { useDispatch } from 'react-redux';
import { setNickName } from '../../store/slice';

const Personal = (props) => {
  const {userId,
    currentFirstName,
    currentLastName,
    currentNickName,
    currentBirthDate,
    refreshData} = props;
  const dispatch = useDispatch();
  const [handleStatusOk, setHandleStatusOk] = useState(false);
  const schema = yup.object({
    nickName: yup
      .string()
      .trim()
      .min(2, 'Псевдоним должен быть длиннее 2 символа')
      .required('Поле Имя обязательно к заполнению'),
    firstName: yup
      .string()
      .trim()
      .min(2, 'Имя должно быть длиннее 2 символа')
      .required('Поле Имя обязательно к заполнению'),
    lastName: yup
      .string()
      .trim()
      .min(2, 'Фамилия должна быть длиннее 2 символа')
      .required('Поле Фамилия обязательно'),
    birthDate: yup
      .date()
      .max(new Date(Date.now() - 8 * 365 * 24 * 60 * 60 * 1000), 'Не моложе 8 лет' )
      .required('Поле Дата рождения обязательно'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: currentFirstName,
      lastName: currentLastName,
      nickName: currentNickName,
      birthDate: currentBirthDate
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({nickName, firstName, lastName, birthDate}) => {
    try {
      const dto = {};
      if (nickName !== currentNickName) {
        dto.nickName = nickName;
      }
      if (firstName !== currentFirstName) {
        dto.firstName = firstName;
      }
      if (lastName !== currentLastName) {
        dto.lastName = lastName;
      }
      if ((new Date(birthDate)).toLocaleString() !== (new Date(currentNickName)).toLocaleString()) {
        dto.birthDate = birthDate;
      }
      await UserController.updateUser(userId, dto);
      dispatch(setNickName(nickName));
      setHandleStatusOk(true);
      refreshData();
    } catch (err) {
      setHandleStatusOk(false);
      console.log('Update user data failed');
      console.log(err);
    }
  }

  const handleReset = () => {
    reset();
  }

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    {handleStatusOk ? <Typography>Успешно заменено</Typography> : ''}
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
      mt={3}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '60ch' },
      }}
    >
      <input {...register('nickName')} placeholder="Псевдоним" />
      <input {...register('firstName')} placeholder="Имя" />
      <input {...register('lastName')} placeholder="Фамилия" />
      <input {...register('birthDate')} placeholder="Дата рождения" type='date' />

      {errors?.nickName && (<p className={styles.error}>{errors?.nickName?.message || 'Err!!!!!'}</p>)}
      {errors?.firstName && (<p className={styles.error}>{errors?.firstName?.message || 'Err!!!!!'}</p>)}
      {errors?.lastName && (<p className={styles.error}>{errors?.lastName?.message || 'Err!!!!!'}</p>)}
      {errors?.birthDate && (<p className={styles.error}>{errors?.birthDate?.message || 'Err!!!!!'}</p>)}
      <Button type='submit' disabled={!(isValid && isDirty)} variant="contained">Сохранить данные</Button>
      <Button type='button' disabled={!isDirty} variant="contained" onClick={handleReset}>Отменить изменения</Button>
    </Stack>
  </form>
);
}

export default Personal;
