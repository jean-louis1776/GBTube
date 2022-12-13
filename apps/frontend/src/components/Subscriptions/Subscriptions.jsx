import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Header, Loader } from '../';
import SearchSubForm from './SearchSubForm';
import ChannelCard from '../ChannelCard/ChannelCard';
import GetChildrenController from '../../controllers/GetChildrenController';
import { store } from '../../store';

import styles from './Subscriptions.module.scss';

const Subscriptions = () => {
  const selectedCategory = 'Мои подписки';

  const { profileReducer } = store.getState();
  const currentUserId = Number(profileReducer.id);
  const [subComp, setSubComp] = useState(<Loader />);
  const refSubscriptions = useRef([]);

  useEffect(() => {
    document.title = 'Мои подписки | GeekTube';

    const fetchSubscriptions = async (userId) => {
      return GetChildrenController.getSubscriptions(userId);
    };
    fetchSubscriptions(currentUserId)
      .then((subs) => {
        refSubscriptions.current = subs;

        refSubscriptions.current === 0
          ? setSubComp(
              <Typography variant="h5" sx={{ userSelect: 'none' }}>
                К сожалению, вы ни на кого еще не подписались
              </Typography>
            )
          : setSubComp(
              <Box className={styles.likesGrid}>
                {subs
                  .slice()
                  .reverse()
                  .map((idList, index) => (
                    <ChannelCard idList={idList} key={index} />
                  ))}
              </Box>
            );
      })
      .catch((err) => {
        console.log('Fetch subscriptions error');
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header selectedCategory={selectedCategory} />

      <Box className={styles.subWrapper}>
        <Box component="main" className={styles.subMain}>
          <Typography className={styles.subTitle} sx={{ mb: 8 }} variant="h4">
            Мои подписки
          </Typography>

          {/*<SearchSubForm />*/}

          {subComp}
        </Box>
      </Box>
    </>
  );
};

export default Subscriptions;
