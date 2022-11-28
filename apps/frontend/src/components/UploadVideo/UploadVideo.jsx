import React, { Fragment, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useForm, Controller } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { Header } from '../';
import { DESCRIPTION, TITLE } from '@constants/frontend';
import { getSelector } from '../../store/getSelector';
import { uploadVideo } from '../../features/video/videoSlice';
import { uploadErrorMessage } from './uploadErrorMessage';

import styles from './UploadVideo.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const steps = [
  'Выберите видео для загрузки',
  'Придумайте название ролику и описание',
];

const UploadVideo = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadError, setUploadError] = useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const video = useSelector(getSelector('videoDetail', 'video'));
  const dispatch = useDispatch();

  const schema = yup
    .object({
      videoFile: yup.mixed().required('Пожалуйста загрузите видео'),
      title: yup.string().required('Название ролика обязательно'),
      description: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: video,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (userVideo) => {
    try {
      dispatch(uploadVideo(userVideo));
      setUploadError('');
    } catch {
      setUploadError('Ошибка загрузки. Повторите попытку');
      console.log('Upload failed');
    }
    reset();
  };

  return (
    <>
      <Helmet>
        <title>GeekTube | Загрузка видео</title>
      </Helmet>

      <Header />

      <Stack className={styles.uploadWrapper}>
        <Paper
          elevation={3}
          sx={{
            width: '1100px',
            height: '400px',
            pt: '40px',
            pl: '50px',
            pr: '50px',
            pb: '20px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Stepper activeStep={activeStep}>
              {steps.map((label) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step
                    key={label}
                    {...stepProps}
                    sx={{
                      '& .MuiStepLabel-root .Mui-completed': {
                        color: 'coplimentPink', // circle color (COMPLETED)
                      },
                      '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                        {
                          color: 'white', // Just text label (COMPLETED)
                        },
                      '& .MuiStepLabel-root .Mui-active': {
                        color: 'baseBlue', // circle color (ACTIVE)
                      },
                      '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                        {
                          color: 'white', // Just text label (ACTIVE)
                        },
                      '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                        fill: 'white', // circle's number (ACTIVE)
                      },
                      userSelect: 'none',
                      color: 'white',
                    }}
                  >
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length && onSubmit ? (
              <Fragment>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <DoneOutlineIcon
                    color="baseBlue"
                    sx={{ width: '2.5rem', height: '2.5rem' }}
                  />
                  <Typography
                    sx={{
                      mt: 2,
                      mb: 1,
                      textAlign: 'center',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      userSelect: 'none',
                    }}
                  >
                    Видео успешно загружено!
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset} color="baseBlue">
                    Загрузить еще
                  </Button>
                </Box>
              </Fragment>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={
                  activeStep !== 2
                    ? {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'stretch',
                        height: '100%',
                        marginTop: '6rem',
                      }
                    : {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'stretch',
                        height: '100%',
                        marginTop: '3rem',
                      }
                }
              >
                <div
                  style={
                    activeStep === 0
                      ? { display: 'flex', justifyContent: 'center' }
                      : { display: 'none' }
                  }
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="baseBlue"
                      component="label"
                    >
                      <VideocamIcon sx={{ mr: 1 }} />
                      Выбрать файл
                      <input
                        {...register('videoFile')}
                        hidden
                        accept="video/*,.3gp,.avi,.flv,.m4v,.mkv,.mov,.mp4,.mpeg,.mpg,.wmv,.swf,.webm"
                        type="file"
                      />
                    </Button>

                    <uploadErrorMessage errors={errors} type={'videoFile'} />

                    <Typography
                      sx={{
                        mt: 2,
                        color: '#999',
                        textAlign: 'center',
                        userSelect: 'none',
                      }}
                    >
                      Допускаются файлы формата: <br /> .3gp, .avi, .flv, .m4v,
                      .mkv, .mov, .mp4, .mpeg, .mpg, .wmv, .webm
                    </Typography>
                  </Box>
                </div>

                <div
                  style={
                    activeStep === 1
                      ? {
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                        }
                      : { display: 'none' }
                  }
                >
                  <TextField
                    {...register('title')}
                    sx={{ width: '500px', mb: 1.5 }}
                    label="Название видео"
                  />

                  <uploadErrorMessage errors={errors} type={'title'} />

                  <TextField
                    {...register('description')}
                    sx={{ width: '500px' }}
                    label="Описание (опционально)"
                    multiline
                    rows={4}
                  />
                </div>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Назад
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />

                  {activeStep === steps.length - 1 ? (
                    <Button type="submit" color="baseBlue" disabled={!isValid}>
                      Готово
                    </Button>
                  ) : (
                    <Button onClick={handleNext} color="baseBlue">
                      Далее
                    </Button>
                  )}
                </Box>
              </form>
            )}
          </Box>
        </Paper>
      </Stack>
    </>
  );
};

export default UploadVideo;
