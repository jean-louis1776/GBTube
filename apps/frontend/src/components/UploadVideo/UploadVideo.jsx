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

import { Header } from '../';

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

const channels = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const steps = [
  'Выберите канал, куда будет загружено видео',
  'Выберите видео для загрузки',
  'Придумайте название ролику и описание',
];

const UploadVideo = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [channelId, setChannelId] = React.useState('');

  const handleChange = (event) => {
    setChannelId(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(JSON.stringify(data));

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
            {activeStep === steps.length ? (
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
                  <Controller
                    name="chooseChannel"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div style={{ width: '500px' }}>
                        <InputLabel id="select-channel">Каналы</InputLabel>
                        <Select
                          sx={{ width: '100%' }}
                          labelId="select-channel"
                          id="channel-select"
                          value={channelId}
                          label="Каналы"
                          onChange={handleChange}
                          MenuProps={MenuProps}
                        >
                          {channels.map((channels) => (
                            <MenuItem key={channels}>{channels}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    )}
                  />
                </div>

                <div
                  style={
                    activeStep === 1
                      ? { display: 'flex', justifyContent: 'center' }
                      : { display: 'none' }
                  }
                >
                  <Controller
                    name="chooseFile"
                    control={control}
                    rules={{ required: true }}
                    render={() => (
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
                            hidden
                            accept="video/*,.3gp,.avi,.flv,.m4v,.mkv,.mov,.mp4,.mpeg,.mpg,.wmv,.swf,.webm"
                            type="file"
                          />
                        </Button>
                        <Typography
                          sx={{
                            mt: 2,
                            color: '#999',
                            textAlign: 'center',
                            userSelect: 'none',
                          }}
                        >
                          Допускаются файлы формата: <br /> .3gp, .avi, .flv,
                          .m4v, .mkv, .mov, .mp4, .mpeg, .mpg, .wmv, .webm
                        </Typography>
                      </Box>
                    )}
                  />
                </div>

                <div
                  style={
                    activeStep === 2
                      ? {
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                        }
                      : { display: 'none' }
                  }
                >
                  <Controller
                    name="chooseTitle"
                    control={control}
                    rules={{ required: true }}
                    render={() => (
                      <TextField
                        sx={{ width: '500px', mb: 1.5 }}
                        label="Название видео"
                      />
                    )}
                  />

                  <Controller
                    name="chooseDescription"
                    control={control}
                    render={() => (
                      <TextField
                        sx={{ width: '500px' }}
                        label="Описание (опционально)"
                        multiline
                        rows={4}
                      />
                    )}
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
                    <Button type="submit" onClick={handleNext} color="baseBlue">
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
