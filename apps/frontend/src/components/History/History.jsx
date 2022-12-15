import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Header } from '../';
import SearchHistoryForm from './SearchHistoryForm';
import VideoListItem from '../VideoListItem/VideoListItem';
import VideoController from '../../controllers/VideoController';
import { store } from '../../store';
import Loader from '../Loader/Loader';
import { batch, useDispatch, useSelector } from 'react-redux';
import { historyListSelector } from '../../store/selectors';
import { setHistoryList, setSearchString } from '../../store/slice';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './History.module.scss';

const History = () => {
  const selectedCategory = 'История';

  const [loading, setLoading] = useState(false);
  const { profileReducer } = store.getState();
  const currentUserId = Number(profileReducer.id);
  const dispatch = useDispatch();
  const historyList = useSelector(historyListSelector);

  useEffect(() => {
    document.title = 'История | GeekTube';
    setLoading(true);
    try {
      const videoHistory = async (userId) => {
        return VideoController.getVideoHistory(userId);
      };
      videoHistory(currentUserId)
        .then((videos) => dispatch(setHistoryList(videos)))
        .then(() => setLoading(false));
      return () => {
        batch(() => {
          dispatch(setHistoryList([]));
          dispatch(setSearchString(''));
        });
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClearStory = async () => {
    try {
      await VideoController.clearUserHistory(+currentUserId);
      dispatch(setHistoryList([]));
    } catch (error) {
      console.log(
        `Не удается удалить видео из истории. Ошибка: ${error.message}`
      );
    }
  };

  return (
    <>
      <Header selectedCategory={selectedCategory} />

      <Box className={styles.historyWrapper}>
        <Box component="main" className={styles.historyMain}>
          <Typography className={styles.historyTitle} variant="h4">
            История просмотров
          </Typography>

          <SearchHistoryForm />

          {historyList && (
            <Button
              variant="outlined"
              color="whiteButton"
              sx={{ mb: 4 }}
              onClick={onClearStory}
            >
              <DeleteIcon sx={{ mr: 1 }} />
              Очистить историю
            </Button>
          )}

          <Box>
            {loading ? (
              <Loader />
            ) : historyList.length === 0 ? (
              <Typography variant="h5" sx={{ userSelect: 'none' }}>
                Похоже вы еще не посмотрели свое первое видео
              </Typography>
            ) : (
              historyList
                .slice()
                .reverse()
                .map((idList) => (
                  <VideoListItem
                    idList={idList}
                    key={idList}
                    userId={currentUserId}
                    deleteFromHistory
                  />
                ))
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default History;
