import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Header } from '../';
import SearchSubForm from './SearchSubForm';
import ChannelCard from '../ChannelCard/ChannelCard';
import styles from './Subscriptions.module.scss';
import { shallowEqual, useSelector } from 'react-redux';
import { getUserId } from '../../store/selectors';
import GetChildrenController from '../../controllers/GetChildrenController';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const userId = useSelector(getUserId, shallowEqual);
  useEffect(() => {
    document.title = 'Мои подписки | GeekTube';
    const fetchSubscriptions = async () => {
      return GetChildrenController.getSubscriptions(userId);
    }

    fetchSubscriptions().then((list) => {
      setSubscriptions(list);
    })
      .catch((err) => {
      console.log('Fetch subscriptions error');
      console.log(err);
    });
  }, []);

  return (
    <>
      <Header selectedCategory={'Мои подписки'} />

      <Box className={styles.subWrapper}>
        <Box component="main" className={styles.subMain}>
          <Typography className={styles.subTitle} variant="h4">
            Мои подписки
          </Typography>

          {/*<SearchSubForm />*/}

          <Box className={styles.likesGrid}>
            {subscriptions.length > 0 ? subscriptions.map(
              (idList, index) => <ChannelCard idList={idList} key={index} />)
              : <Typography>Нет ни одной подписки</Typography>}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Subscriptions;
