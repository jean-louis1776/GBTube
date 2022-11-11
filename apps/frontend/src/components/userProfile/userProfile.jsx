import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import {
  TextField,
  Box,
  Avatar,
  Stack,
  Button,
  Paper,
  IconButton,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import styles from './userProfile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUser,
  userDataUpdate,
} from '../../features/userProfile/userProfileSlice';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userProfileFormSchema } from './validation';
import { getSelector } from '../../store/getSelector';
import { PhotoCamera } from '@mui/icons-material';
import store from '../../store/store';

const UserProfile = () => {
  const theme = useTheme();

  const ColorButton = styled(IconButton)(({ theme }) => ({
    color: 'transparent',
    backgroundColor: theme.palette.shadows.main,
    opacity: 0.7,
    transition: '.3s ease',
    '&:hover': {
      color: theme.palette.baseBlue.main,
    },
  }));

  const AvatarUpload = styled(PhotoCamera)(({ theme }) => ({
    width: 50,
    height: 50,
    color: 'transparent',
    position: 'absolute',
    top: '-600%',
    backgroundColor: 'transparent',
    transition: '.3s ease',
    '&:hover': {
      color: theme.palette.baseBlue.main,
    },
  }));

  const FormField = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.baseBlue.contrastText,
    '&:active': {
      borderColor: theme.palette.coplimentPink.main,
    },
  }));

  const user = useSelector(getSelector('userProfile', 'user'));
  console.log(user);

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

  const currentUserState = store.getState().userProfile;
  const [currentState, setCurrentState] = useState(currentUserState);
  console.log('currentUserState:', currentUserState);

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

  const onSubmitForm = handleSubmit((updatingUser) => {
    dispatch(userDataUpdate(updatingUser));
    console.log(updatingUser);
  });

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearUser());
  //   };
  // }, [dispatch]);

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  return (
    <>
      <Header />
      <Box className={styles.userForm} sx={{ bgcolor: 'darkBackground.main' }}>
        <Paper className={styles.userForm_container}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              marginBottom: 3,
              position: 'relative',
            }}
            alt="avatar"
            src=""
          />
          <ColorButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <AvatarUpload />
          </ColorButton>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '60ch' },
            }}
            autoComplete="off"
            onChange={compareUserData}
          >
            <Stack>
              <FormField label="Имя" {...register('firstName')} />
              <FormField label="Фамилия" {...register('lastName')} />
              <FormField label="Никнейм" {...register('nickName')} />
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
                      renderInput={(params) => <FormField {...params} />}
                    />
                  </LocalizationProvider>
                )}
              />
              <FormField
                {...register('email')}
                disabled={emailDisabled}
                // defaultValue="usermail@mail.ru"
                label="e-mail"
              />
            </Stack>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            mt={3}
          >
            <Button onClick={resolveMailEdit} variant="contained">
              {emailDisabled ? 'Изменить почту' : 'Подтвердить'}
            </Button>
            <Button
              disabled={isEqualUserData}
              onClick={onSubmitForm}
              variant="contained"
            >
              Сохранить данные
            </Button>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default UserProfile;
