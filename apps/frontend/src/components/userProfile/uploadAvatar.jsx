import { Avatar, Button, Typography } from '@mui/material';
import UserController from '../../controllers/UsersController';
import React, { useState } from 'react';

const UploadAvatar = ({userId, refreshData}) => {
  const [image, setImage] = useState(null);
  const [handleStatusOk, setHandleStatusOk] = useState(false);
  const imgChange = (evt) => {
    console.dir(evt.target.files[0]);
    setImage(evt.target.files[0]);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    // const formData = new FormData(evt.target);
    // formData.append('files', image);
    try {
      await UserController.addAvatar(userId, formData);
      setHandleStatusOk(true);
      refreshData();
    } catch (err) {
      setHandleStatusOk(false);
      console.log('Send image failed');
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={imgChange} type='file'
               accept="image/*,.jpg,.jpeg,.png,.apng,.webp,.gif,.avif,.svg,.ico,.bmp"
        />
        <Button disabled={!image} type='submit' >Отправить</Button>
      </form>
      {handleStatusOk ? <Typography>Успешно загружено</Typography> : ''}
      {image ? <Avatar
        sx={{
          width: 100,
          height: 100,
          marginBottom: 3,
          position: 'relative',
        }}
        alt="avatar"
        src={URL.createObjectURL(image)}
      /> : ''}
    </>
  );
}

export default UploadAvatar;
