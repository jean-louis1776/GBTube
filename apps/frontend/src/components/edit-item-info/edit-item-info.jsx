import styles from './edit-item-info.module.scss';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import {
  CHANNEL,
  DESCRIPTION,
  logo,
  PLAYLIST,
  TITLE,
  VIDEO,
} from '@constants/frontend';
import FormComp from './FormComp';

/**
 * Универсальный компонент для создания и редактирования канала и плейлиста
 */
export function EditItemInfo({ elemType, sendData, isEdit, getItemById }) {
  const { idList } = useParams();
  const refDefaultValues = useRef({ [TITLE]: '', [DESCRIPTION]: '' });
  const [isStartRender, setIsStartRender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const elemId = idList.split('_').at(-1);
      return elemType === VIDEO
        ? await getItemById(elemId)
        : await getItemById(elemType, elemId);
    };
    if (isEdit) {
      fetchData()
        .then((data) => {
          const { title, description } = data;
          refDefaultValues.current[TITLE] = title;
          refDefaultValues.current[DESCRIPTION] = description;
          setIsStartRender(true);
        })
        .catch((err) => {
          console.log(`${elemType} not found`);
          console.log(err);
        });
    }
    let elemName = '';
    if (elemType === CHANNEL) {
      elemName = 'канала';
    } else if (elemType === PLAYLIST) {
      elemName = 'плейлиста';
    } else if (elemType === VIDEO) {
      elemName = 'видео';
    }

    document.title = `Создание / изменение ${elemName} | GeekTube`;
  }, [elemType]);

  return (
    <Stack className={styles.loginSection}>
      <Paper elevation={3} className={styles.loginPaper}>
        <Link to="/" className={styles.loginLogo}>
          <img src={logo} alt="Logo" height={45} />
          <Typography
            className={styles.logoName}
            variant="h4"
            fontWeight="bold"
            sx={{ ml: 1 }}
          >
            Geek
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: 'baseBlue.main',
              display: 'inline',
              fontSize: '1.5rem',
            }}
          >
            Tube
          </Typography>
        </Link>

        {!isEdit || isStartRender ? (
          <FormComp
            elemType={elemType}
            idList={idList}
            sendData={sendData}
            defaultValues={refDefaultValues.current}
          />
        ) : (
          ''
        )}

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} GeekTube Team. Все права защищены
        </p>
      </Paper>
    </Stack>
  );
}
export default EditItemInfo;
