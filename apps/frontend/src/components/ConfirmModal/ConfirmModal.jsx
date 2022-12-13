import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

import styles from './ConfirmModal.module.scss';

const ConfirmModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Вы уверены?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
              Нажимая <span style={{ fontWeight: 600 }}>"Удалить"</span>, вы
              удалите видео вместе с просмотрами, лайками и комментариями без
              возможности восстановления. <br /> Для отмены нажмите{' '}
              <span style={{ fontWeight: 600 }}>"Отмена"</span>.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="whiteButton">
            Отмена
          </Button>
          <Button onClick={handleClose} autoFocus variant="contained">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConfirmModal;
