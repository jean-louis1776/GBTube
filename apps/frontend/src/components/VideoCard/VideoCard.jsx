import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import {
  demoVideoUrl,
  // demoVideoTitle,
  demoChannelTitle,
  demoChannelUrl,
  VIDEO,
} from '@constants/frontend';
import GetChildrenController from '../../controllers/GetChildrenController';

import styles from './VideoCard.module.scss';

const VideoCard = (/*{
  video: {
    id: { videoId },
    snippet,
  },
}*/) => {
  const [title, setTitle] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { title } = await GetChildrenController.getItemById(VIDEO, id);
      setTitle(title);
    };
    fetchData().catch(() => {
      setTitle('');
      console.log(`Video ID: ${id} not found`);
    });
  }, []);

  return (
    <Card
      sx={{
        // width: { xs: '100%', sm: '358px', md: '320px' },
        boxShadow: 'none',
        borderRadius: 0,
      }}
    >
      <Link to={demoVideoUrl}>
        <CardMedia
          // image={snippet?.thumbnails?.high?.url}
          // alt={snippet?.title}
          sx={{ width: { xs: '100%', sm: '358px', md: '320px' }, height: 180 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: '#1e1e1e', height: '106px' }}>
        <Link to={demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#fff">
            {
              //snippet?.title.slice(0, 60) ||
              title.slice(0, 60)
            }
          </Typography>
        </Link>
        <Link to={demoChannelUrl}>
          <Typography
            // className="channel-name"
            variant="subtitle2"
            color="gray"
          >
            {demoChannelTitle}
            <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
