import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { TextField, Box, Avatar, Stack, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import styles from './userProfile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUser,
  getUserData,
  userDataUpdate,
} from '../../features/userProfile/userProfile';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userProfileFormSchema } from './validation';
import { getSelector } from '../../store/getSelector';

const UserProfile = () => {
  // const theme = useTheme();

  const user = useSelector(getSelector('userProfile', 'user'));

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: user,
    resolver: yupResolver(userProfileFormSchema),
  });
  const [emailDisabled, setEmailDisabled] = useState(true);
  const resolveMailEdit = () => {
    setEmailDisabled((prevDisabled) => !prevDisabled);
  };

  const [isEqualUserData, setIsEqualUserData] = useState(true);
  const compareUserData = () => {
    setIsEqualUserData((prevCompare) => !prevCompare);
  };

  const dispatch = useDispatch();

  const onChangeDate = (date) => {
    setValue('birthDate', date);
  };

  const onSubmitForm = handleSubmit((userForm) => {
    dispatch(userDataUpdate(userForm));
    console.log(userForm);
  });

  useEffect(() => {
    dispatch(getUserData());

    return () => {
      dispatch(clearUser());
    };
  }, [dispatch]);

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  return (
    <>
      <Header />
      <Box className={styles.userForm}>
        <Box className={styles.userForm_container}>
          <Avatar
            sx={{ width: 100, height: 100, marginBottom: 3 }}
            alt="avatar"
            src=""
          />
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '60ch' },
            }}
            autoComplete="off"
            onChange={compareUserData}
          >
            <Stack spacing={2}>
              <TextField label="Имя" {...register('firstName')} />
              <TextField label="Фамилия" {...register('lastName')} />
              <TextField label="Никнейм" {...register('nickName')} />
              <Controller
                name={'birthDate'}
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      {...field}
                      onChange={onChangeDate}
                      label="Дата рождения"
                      inputFormat="DD.MM.YYYY"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                )}
              />
              <TextField
                {...register('email')}
                disabled={emailDisabled}
                id="email"
                defaultValue="usermail@mail.ru"
                label="e-mail"
              />
            </Stack>
          </Box>
          <Stack direction="row" spacing={2} marginTop={3}>
            <Button disabled={isEqualUserData} onClick={onSubmitForm}>
              Сохранить данные
            </Button>
            <Button onClick={resolveMailEdit}>
              {emailDisabled ? 'Изменить почту' : 'Подтвердить'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
