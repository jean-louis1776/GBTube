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
import { useTheme } from '@mui/material/styles';

import { Header } from '../';

import styles from './UploadVideo.module.scss';

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

  return (
    <>
      <Header />

      <Stack className={styles.uploadWrapper}>
        <Paper
          elevation={3}
          sx={{ width: '1100px', height: '400px', padding: '50px' }}
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
                        color: '#fc1503', // circle color (COMPLETED)
                      },
                      '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                        {
                          color: 'grey.500', // Just text label (COMPLETED)
                        },
                      '& .MuiStepLabel-root .Mui-active': {
                        color: '#fc1503', // circle color (ACTIVE)
                      },
                      '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                        {
                          color: 'common.white', // Just text label (ACTIVE)
                        },
                      '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                        fill: 'white', // circle's number (ACTIVE)
                      },
                      userSelect: 'none',
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
                    color="red"
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
                  <Button onClick={handleReset} color="red">
                    Загрузить еще
                  </Button>
                </Box>
              </Fragment>
            ) : activeStep === 0 ? (
              <Fragment>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <FormControl sx={{ width: '500px' }}>
                    <InputLabel id="demo-simple-select-label">
                      Каналы
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={channelId}
                      label="Каналы"
                      onChange={handleChange}
                    >
                      {channels.map((channels) => (
                        <MenuItem key={channels}>{channels}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
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

                  <Button onClick={handleNext} color="red">
                    Далее
                  </Button>
                </Box>
              </Fragment>
            ) : activeStep === 1 ? (
              <Fragment>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button variant="contained" color="red" component="label">
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
                    Допускаются файлы формата: <br /> .3gp, .avi, .flv, .m4v,
                    .mkv, .mov, .mp4, .mpeg, .mpg, .wmv, .webm
                  </Typography>
                </Box>
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

                  <Button onClick={handleNext} color="red">
                    Далее
                  </Button>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    sx={{ width: '500px', mb: 1.5 }}
                    required
                    label="Название видео"
                  />
                  <TextField
                    sx={{ width: '500px' }}
                    label="Описание (опционально)"
                    multiline
                    rows={4}
                  />
                </Box>
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

                  <Button onClick={handleNext} color="red">
                    {activeStep === steps.length - 1 ? 'Готово' : 'Вперед'}
                  </Button>
                </Box>
              </Fragment>
            )}
          </Box>
        </Paper>
      </Stack>
    </>
  );
};

export default UploadVideo;
