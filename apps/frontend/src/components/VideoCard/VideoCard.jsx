import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
} from '@mui/material';
import { CheckCircle, VisibilityOffIcon } from '@mui/icons-material';
import { demoChannelUrl, VIDEO } from '@constants/frontend';
import GetChildrenController from '../../controllers/GetChildrenController';

import { theme } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { getSelector } from '../../store/getSelector';

const VideoCard = () => {
  const [title, setTitle] = useState('');
  const { idList } = useParams();

  const dispatch = useDispatch();
  const video = useSelector(getSelector('videoDetail', 'video'));

  useEffect(() => {
    const fetchData = async () => {
      const { title } = await GetChildrenController.getItemById(
        VIDEO,
        idList.split('_').at(-1)
      );
      setTitle(title);
    };
    fetchData().catch(() => {
      setTitle('');
      console.log(`Video ID: ${idList} not found`);
    });
  }, []);

  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '358px', md: '320px' },
        height: 'auto',
        boxShadow: 'none',
        borderRadius: 0,
      }}
    >
      <Link to={'/videoDetail'}>
        <CardMedia
          image={video.frameShot ? video.frameShot : <VisibilityOffIcon />}
          // image={video.frameShot}
          sx={{
            // width: { xs: '100%', sm: '358px', md: '320px' },
            height: 180,
            backgroundColor: theme.palette.baseBlue.main,
          }}
        />
        <CardContent
          sx={{
            backgroundColor: theme.palette.darkBackground.main,
            // height: '132px',
            height: 'auto',
          }}
        >
          {video?.title?.length > 60 ? (
            <Tooltip title={video.title}>
              <Typography variant="subtitle1" fontWeight="bold" color="#fff">
                {video.title.slice(0, 60) + '...'}
              </Typography>
            </Tooltip>
          ) : (
            <Typography variant="subtitle1" fontWeight="bold" color="#fff">
              {video.title}
            </Typography>
          )}
          <Link to={demoChannelUrl}>
            <Typography
              sx={{
                display: 'inline-block',
                paddingY: '3px',
                color: theme.palette.shadows.second,
              }}
              variant="subtitle2"
            >
              {video.channelName}
              <CheckCircle
                sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
              />
            </Typography>
          </Link>
          <Typography
            variant="caption"
            sx={{ display: 'block', color: theme.palette.shadows.second }}
          >
            {video.viewsCount}
            {' просмотров'}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default VideoCard;
