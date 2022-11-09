import styles from './edit-item-info.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { logo } from '@constants/frontend';
import EditItemController from '../../controllers/EditItemController';

export function EditItemInfo({ elemType, oldTitle = '', oldDescription = '' }) {
  let [title, setTitle] = useState(oldTitle);
  let [description, setDescription] = useState(oldDescription);
  const navigate = useNavigate();

  const handleTitleChange = (evt) => {
    setTitle(evt.target.value);
  }
  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await EditItemController.addItem(elemType, {title, description});
      navigate(-1);
    } catch {
      console.log(`Create ${elemType} failed`);
    }
    setTitle('');
    setDescription('');
  }

  return (
    <Stack className={styles.editElementSection}>
      <Paper elevation={3} className={styles.signupPaper}>
        <Link to="/" className={styles.signupLogo}>
          <img src={logo} alt="Logo" height={45} />

          <Typography
            className={styles.logoName}
            variant="h4"
            fontWeight="bold"
            sx={{ color: '#000', ml: 1 }}
          >
            Geek<span style={{ color: '#fc1503' }}>Tube</span>
          </Typography>
        </Link>

        <form
          onSubmit={handleSubmit}
          className={styles.signupForm}
        >
          <h3>Создайте свой {elemType}</h3>
          <Stack className={styles.inputStuck}>
            <input
              placeholder="Введите название"
              name="title"
              onChange={handleTitleChange}
              value={title}
              className={styles.signupInput}
            />

            <textarea
              placeholder="Введите описание"
              name="description"
              onChange={handleDescriptionChange}
              value={description}
              className={styles.signupInput}
            />
          </Stack>

          <div>
            {/* {error && (
              <p className={classes.error}>
                Ошибка: такого аккаунта не существует
              </p>
            )} */}
            <Button type="submit" color="red" variant="contained">
              Создать {elemType}
            </Button>
          </div>
        </form>

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} GeekTube Team. Все права защищены
        </p>
      </Paper>
    </Stack>
  );
}
export default EditItemInfo;
