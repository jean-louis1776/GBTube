import styles from './edit-item-info.module.scss';
import { Button, Stack, Typography } from '@mui/material';
import { CHANNEL, DESCRIPTION, TITLE } from '@constants/frontend';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const FormComp = ({ elemType, idList, sendData, defaultValues }) => {

  let elemName = elemType === CHANNEL ? 'канала' : 'плейлиста';
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({ mode: 'onBlur', defaultValues });

  const onSubmit = async ({ title, description }) => {
    const dto = { title, description, idList };
    try {
      await sendData(elemType, dto);
      reset();
      navigate(-1, { replace: true });
    } catch {
      console.log(`Create ${elemType} failed`);
    }
  };

  const handleResetForm = () => {
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Изменение {elemName}
      </Typography>
      <Stack
        className={styles.inputStuck}
        sx={{ backgroundColor: 'shadows.main' }}
      >
        <label className={styles.copyright}>
          {' '}
          Название {elemName}
          <br />
          <input
            {...register(TITLE, {
              required: 'Поле Название обязательно к заполнению',
              minLength: {
                value: 1,
                message: 'Требуется не менее 1 символа в поле Название',
              },
            })}
            type="text"
            className={styles.loginInput}
            autoFocus
          />
        </label>
        <label className={styles.copyright}>
          Описание {elemName}
          <br />
          <textarea
            {...register(DESCRIPTION)}
            className={styles.loginInput}
          />
        </label>
      </Stack>

      <div>
        <div className={styles.copyright}>
          {errors[TITLE] && <p>{errors[TITLE].message || 'Err!!!!!'}</p>}
        </div>
        <div className={styles.btn}>
          <Button
            type="submit"
            color="baseBlue"
            variant="contained"
            disabled={!(isValid && isDirty)}
          >
            Сохранить
          </Button>
          <Button
            type="submit"
            color="baseBlue"
            variant="contained"
            onClick={handleResetForm}
            disabled={!isDirty}
          >
            Сбросить
          </Button>
        </div>
      </div>
    </form>
  );
}

export default FormComp;
