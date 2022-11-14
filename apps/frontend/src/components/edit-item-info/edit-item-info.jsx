import styles from './edit-item-info.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React/*,{ useEffect, useState }*/ from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { CHANNEL, DESCRIPTION, ID_LIST, logo, TITLE } from '@constants/frontend';
// import EditItemController from '../../controllers/EditItemController';
import { useForm } from 'react-hook-form';

/**
 * Универсальный компонент для создания и редактирования канала и плейлиста
 * @param {'channel' | 'playlist'} elemType
 * @param { EditItemController.addItem | EditItemController.updateItem } sendData
 * @returns {JSX.Element}
 * @constructor
 */
export function EditItemInfo({ elemType, sendData }) {
  let elemName = elemType === CHANNEL ? 'канала' : 'плейлиста';
  // let [title, setTitle] = useState('');
  // let [description, setDescription] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  // let [idList, setIdList] = useState(location.state.idList);
  const { register, handleSubmit, formState:{ errors, isValid, isDirty }, reset } = useForm({mode: 'onBlur'});
  // const handleTitleChange = (evt) => {
  //   console.log(evt.target.value);
  //   setTitle(evt.target.value);
  // }
  //
  // const handleDescriptionChange = (evt) => {
  //   console.log(evt.target.value);
  //   setDescription(evt.target.value);
  // }

  const onSubmit = async ({title, description}) => {
    const dto = {title, description, [ID_LIST]: location.state[ID_LIST].join(';')};
    try {
      await sendData(elemType, dto);
      reset();
      navigate(-1, { replace: true });
    } catch {
      console.log(`Create ${elemType} failed`);
    }
  }

  // useEffect(() => {
  //   const elemId = location.state[ID_LIST].at(-1);
  //   const fetchData = async () => {
  //     const {/*id ,*/ title, description} = await EditItemController.getItemById(elemType, elemId);
  //     // setTitle(title);
  //     // setDescription(description);
  //   }
  //   fetchData().catch(() => {
  //     // setTitle('');
  //     // setDescription('');
  //     console.log(`${elemType} ID: ${elemId} not found`);
  //   });
  // },[]);

  return (
  <Stack className={styles.loginSection}>
    <Paper elevation={3} className={styles.loginPaper}>
      <Link to="/" className={styles.loginLogo}>
        <img src={logo} alt="Logo" height={45} />
        <Typography
          className={styles.logoName}
          // variant="h4"
          fontWeight="bold"
          sx={{ ml: 1 }}
        >
          Geek
          <Typography
            // variant="h4"
            fontWeight="bold"
            sx={{
              color: 'baseBlue.main',
              display: 'inline',
              fontSize: '1.5rem',
            }}
          >
            Tube
          </Typography>
        </Typography>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Изменение {elemName}
        </Typography>
        <Stack
          className={styles.inputStuck}
          sx={{ backgroundColor: 'shadows.main' }}
        >
          <label className={styles.copyright}> Название {elemName}<br/>
            <input
              {...register(TITLE, {
                      required: 'Поле Название обязательно к заполнению',
                      minLength: {
                        value: 1,
                        message: 'Требуется не менее 1 символа в поле Название'
                        }
                      })}
              // value={title}
              // onChange={handleTitleChange}
              type="text"
              className={styles.loginInput}
              autoFocus
            />
          </label>
          <label className={styles.copyright}>Описание {elemName}<br/>
            <textarea
              {...register(DESCRIPTION)}
              // value={description}
              // onChange={handleDescriptionChange}
              className={styles.loginInput}
            />
          </label>
        </Stack>

        <div>
          <div className={styles.copyright}>{errors[TITLE] && <p>{errors[TITLE].message || 'Err!!!!!'}</p>}</div>
          <div className={styles.btn}>
            <Button  type="submit" color="baseBlue" variant="contained" disabled={!(isValid&&isDirty)}>
              Сохранить
            </Button>
          </div>
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
