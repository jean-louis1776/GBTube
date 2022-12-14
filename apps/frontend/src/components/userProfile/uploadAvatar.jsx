import React, { useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import UserController from '../../controllers/UsersController';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';

const UploadAvatar = ({ userId, refreshData }) => {
  const [image, setImage] = useState(null);
  const [handleStatusOk, setHandleStatusOk] = useState(false);
  const imgChange = (evt) => {
    console.dir(evt.target.files[0]);
    setImage(evt.target.files[0]);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    console.dir(formData);
    try {
      await UserController.addAvatar(userId, formData);
      setHandleStatusOk(true);
      setImage(null);
      evt.target.reset();
      refreshData();
    } catch (err) {
      setHandleStatusOk(false);
      console.log('Send image failed');
      console.log(err);
    }
    window.location.reload(false);
  };

  return (
    <>
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '2rem' }}>
        <Button variant="contained" color="baseBlue" component="label">
          <PhotoCameraIcon sx={{ mr: 1 }} />
          Выбрать файл
          <input
            name="avatarFile"
            onChange={imgChange}
            type="file"
            hidden
            accept="image/*,.jpg,.jpeg,.png,.apng,.webp,.gif,.avif,.svg,.ico,.bmp"
          />
        </Button>

        <Button
          disabled={!image}
          type="submit"
          variant="outlined"
          color="whiteButton"
        >
          <UploadIcon sx={{ mr: 1 }} />
          Отправить
        </Button>
      </form>
      <Box>
        {image ? (
          <Avatar
            sx={{
              width: 100,
              height: 100,
              margin: '2rem auto 0',
            }}
            alt="avatar"
            src={URL.createObjectURL(image)}
          />
        ) : (
          ''
        )}
      </Box>
    </>
  );
};

export default UploadAvatar;
