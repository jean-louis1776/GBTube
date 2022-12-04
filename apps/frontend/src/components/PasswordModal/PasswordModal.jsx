import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userPasswordSchema } from './validation';
// import { userPasswordUpdate } from '../../features/userProfile/userProfileSlice';
import { shallowEqual, /*useDispatch,*/ useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { getSelector } from '../../store/getSelector';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { getUserId } from '../../store/selectors';
import UserController from '../../controllers/UsersController';

const PasswordModal = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgColor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const userId = useSelector(getUserId, shallowEqual);

  // const password = useSelector(getSelector('passwordModal', 'user'));

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    // defaultValues: password,
    resolver: yupResolver(userPasswordSchema),
  });

  const onSubmitPassword = async ({oldPassword, newPassword}) => {
    try {
      await UserController.changePassword({oldPassword, newPassword, id: userId});
      console.log('change password successful');
    } catch (err) {
      console.log('change password failed');
      console.log(err);
    }
    // dispatch(userPasswordUpdate(passwordForm));
    // console.log(passwordForm);
  };

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  return (
    <>
      <Button onClick={handleOpen}>Изменить пароль</Button>
      <Box>
        <PasswordModal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack>
              <Typography id="modal-modal-title">
                Введите старый пароль
              </Typography>
              <TextField
                {...register('oldPassword')}
                // id="outlined-password-input"
                label="Старый пароль"
                type="password"
                autoComplete="current-password"
              />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Придумайте новый пароль
              </Typography>
              <TextField
                {...register('newPassword')}
                // id="outlined-password-input"
                label="Новый пароль"
                type="password"
                autoComplete="current-password"
              />
              <TextField
                {...register('confirmPassword')}
                id="password"
                sx={{ mt: 2 }}
                // id="outlined-disabled"
                label="Подтвердить новый пароль"
                type="password"
              />
            </Stack>
            <Button onClick={handleSubmit(onSubmitPassword)} sx={{ mt: 2 }}>
              Подтвердить
            </Button>
          </Box>
        </PasswordModal>
      </Box>
    </>
  );
};

export default PasswordModal;
