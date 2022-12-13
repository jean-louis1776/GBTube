import React, { useEffect, useState } from 'react';
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CHANNEL } from '@constants/frontend';
import GetChildrenController from '../../controllers/GetChildrenController';

import styles from './ChannelCard.module.scss';

const ChannelCard = ({ idList }) => {
  const [channelData, setChannelData] = useState({});
  const channelId = idList.split('_').at(-1);

  useEffect(() => {
    const fetchData = async () => {
      // Без передачи userId в ответе isSubscribed будет всегда false,
      // но так как для карточки это не важно, то и пох.
      return await GetChildrenController.getItemById(CHANNEL, channelId);
    };

    fetchData()
      .then((data) => {
        setChannelData(data);
      })
      .catch((err) => {
        console.log('Fetch video data error');
        console.log(err);
      });
  }, []);

  return (
    // <Box className={styles.videoCard}>
    //   <Link to={`/${CHANNEL}/${idList}`} className={styles.channelLink}>
    //     <Box className={styles.videoInfo}>
    //       <Box className={styles.videoInfoTitle}>
    //         {channelData?.title?.length > 50 ? (
    //           <Tooltip title={channelData.title}>
    //             <Typography className={styles.title}>
    //               {channelData.title.slice(0, 50) + '...'}
    //             </Typography>
    //           </Tooltip>
    //         ) : (
    //           <Typography className={styles.title}>
    //             {channelData.title}
    //           </Typography>
    //         )}
    //       </Box>

    //       <Box className={styles.videoInfoView}>
    //         {Object.hasOwn(channelData, 'title') ? (
    //           <Typography variant="subtitle2" className={styles.channelName}>
    //             <VerifiedIcon sx={{ mr: 1, fontSize: '1rem' }} />
    //             {channelData.title}
    //           </Typography>
    //         ) : (
    //           ''
    //         )}
    //       </Box>
    //     </Box>
    //   </Link>
    // </Box>
    <Box className={styles.ChannelWrapper}>
      <Link to={`/${CHANNEL}/${idList}`} className={styles.ChannelLink}>
        <Avatar />

        {channelData?.title?.length > 50 ? (
          <Tooltip title={channelData.title}>
            <Typography className={styles.title}>
              {channelData.title.slice(0, 50) + '...'}
            </Typography>
          </Tooltip>
        ) : (
          <Typography className={styles.title}>{channelData.title}</Typography>
        )}
      </Link>
    </Box>
  );
};

export default ChannelCard;
