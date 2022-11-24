import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack, Button, Avatar, Tooltip } from '@mui/material';
import {
  AnnouncementOutlined,
  CheckCircle,
  PlaylistAdd,
  ReplyAllOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
  ThumbUp,
  ThumbDown,
} from '@mui/icons-material';
import Loader from '../Loader/Loader';
import VideoCard from '../VideoCard/VideoCard';
// import { fetchFromAPI } from '../utils/fetchFromAPI';
import ShowMoreText from 'react-show-more-text';

import styles from './VideoDetail.module.scss';
import { styled, useTheme } from '@mui/material/styles';
import VideoCommentary from '../VideoCommentary/VideoCommentary';
import { useDispatch, useSelector } from 'react-redux';
import { getSelector } from '../../store/getSelector';
import { Helmet } from 'react-helmet';
import {
  setReaction,
  reactionHandler,
} from '../../features/video/reactionsSlice';
import VideoController from '../../controllers/VideoController';

const VideoDetail = () => {
  const theme = useTheme();
  let [videoContent, setVideoContent] = useState(<Loader />);
  const { idList } = useParams();

  const ReactionButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
    transition: '.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.shadows.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  const SubscribeButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
    padding: '7px 15px',
    transition: '.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.shadows.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  const dispatch = useDispatch();

  const reaction = useSelector(getSelector('reactions', 'like'));
  const reactionLikeCount = useSelector(getSelector('reactions', 'likesCount'));
  const reactionDislikeCount = useSelector(
    getSelector('reactions', 'dislikesCount')
  );

  const likeOrDislikeHandler = (likes) =>
    likes.reduce((prev, cont) => (cont === prev ? null : cont), likes);

  const currentReaction = likeOrDislikeHandler(reaction);

  const [subscribe, setSubscribe] = useState(true);

  // const [videoDetail, setVideoDetail] = useState(null);
  // const [videos, setVideos] = useState(null);


    // useEffect(() => {
    //   setVideoContent(<Loader />);
    //   const fetchData = async () => {
    //     // const video = await VideoController.loadVideo(idList.split('_').at(-1));
    //     setVideoContent(
    //       // <ReactPlayer url={video.data} pip className={styles.reactPlayer} controls={true} />
    //       <video controls className={styles.reactPlayer}>
    //         <source src={`http://localhost:3333/api/video/download/${idList.split('_').at(-1)}`} type="video/mp4" />
    //       </video>
    //     );
    //     console.log('videoFile', video.data);
    //   }
    //
    //   fetchData().catch((err) => {
    //     setVideoContent('');
    //     console.log('Fail load video');
    //   });
    //
    // }, []);

  // if (!videoDetail?.snippet) return <Loader />;
  //
  // const {
  //   snippet: { title, channelId, channelTitle, publishedAt },
  //   statistics: { viewCount, likeCount },
  // } = videoDetail;

  return (
    <Box className={styles.wrapper}>
      <Helmet>
        <title>
          {/*{title}*/}
          VideoTitle | GeekTube
        </title>
      </Helmet>
      <Header />
      <Stack direction={{ xs: 'column', md: 'row' }} className={styles.stack}>
        <Box>
          <Box>
            {
              <div className={styles.playerWrapper}>
                {/*{videoContent}*/}
                <ReactPlayer
                  url={`http://localhost:3333/api/video/download/${idList.split('_').at(-1)}`}
                  pip
                  className={styles.reactPlayer}
                  controls={true}
                />
              </div>
            }
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              py={3}
              px={2}
            >
              <Typography color="#fff" variant="h5" fontWeight="bold">
                {/*{title}*/}
                Title tile title
              </Typography>
              <Typography variant={'body1'} sx={{ opacity: 0.85 }}>
                {parseInt(
                  '740'
                  // viewCount
                ).toLocaleString()}{' '}
                просмотров
              </Typography>
            </Stack>
            <Stack
              direction={{
                xs: 'column',
                md: 'row',
              }}
              justifyContent="space-between"
            >
              <Stack direction="row" className={styles.channel_info}>
                <Link to="/channel">
                  <Box className={styles.channel_sub}>
                    <Avatar sx={{ mr: '10px' }} />
                    <Typography
                      variant={{ sm: 'subtitle1', md: 'h6' }}
                      fontWeight="500"
                    >
                      {/*{channelTitle}*/}
                      Channel Name
                    </Typography>
                    <CheckCircle
                      sx={{ fontSize: '15px', color: 'gray', ml: '5px' }}
                    />
                  </Box>
                </Link>
                {subscribe ? (
                  <SubscribeButton
                    onClick={() => setSubscribe((prevState) => !prevState)}
                    sx={{
                      marginLeft: '1rem',
                      backgroundColor: theme.palette.coplimentPink.main,
                      color: theme.palette.coplimentPink.contrastText,
                    }}
                  >
                    Подписаться
                  </SubscribeButton>
                ) : (
                  <SubscribeButton
                    onClick={() => setSubscribe((prevState) => !prevState)}
                    sx={{
                      marginLeft: '1rem',
                    }}
                  >
                    Отписаться
                  </SubscribeButton>
                )}
              </Stack>
              <Stack direction="row" gap="10px">
                <Stack
                  direction="row"
                  gap="10px"
                  className={styles.reactionsBtn}
                >
                  <Tooltip title="Нравится">
                    <ReactionButton
                      onClick={() => dispatch(setReaction('Like'))}
                    >
                      {currentReaction === 'Like' ? (
                        <ThumbUp
                          sx={{
                            color: theme.palette.coplimentPink.main,
                          }}
                        />
                      ) : (
                        <ThumbUpOutlined />
                      )}
                      <Typography
                        variant={'body1'}
                        sx={{ opacity: 0.7 }}
                        marginLeft={2}
                      >
                        {+reactionLikeCount}{' '}
                      </Typography>
                    </ReactionButton>
                  </Tooltip>
                  <Tooltip title="Не нравится">
                    <ReactionButton
                      onClick={() => dispatch(setReaction('Dislike'))}
                    >
                      {currentReaction === 'Dislike' ? (
                        <ThumbDown
                          sx={{
                            color: theme.palette.coplimentPink.main,
                          }}
                        />
                      ) : (
                        <ThumbDownOutlined />
                      )}
                      <Typography
                        variant="body1"
                        sx={{ opacity: 0.7 }}
                        marginLeft={2}
                      >
                        {+reactionDislikeCount}{' '}
                      </Typography>
                    </ReactionButton>
                  </Tooltip>
                </Stack>
                <Tooltip title="Поделиться">
                  <ReactionButton>
                    <ReplyAllOutlined />
                  </ReactionButton>
                </Tooltip>
                <Tooltip title="Добавить в плейлист">
                  <ReactionButton>
                    <PlaylistAdd />
                  </ReactionButton>
                </Tooltip>
                <Tooltip title="Поддержка">
                  <ReactionButton>
                    <AnnouncementOutlined />
                  </ReactionButton>
                </Tooltip>
              </Stack>
            </Stack>

            <Box
              padding=".7rem"
              marginTop="2rem"
              width="100%"
              backgroundColor={theme.palette.shadows.main}
            >
              <Box variant="body1" sx={{ opacity: 0.85 }}>
                <Typography variant={'body1'} sx={{ opacity: 0.7 }}>
                  Дата публикации:
                  {/*{publishedAt.substring(0, 10)}*/}
                </Typography>
              </Box>
              <ShowMoreText
                className={styles.truncateText}
                lines={1}
                more="Читать далее"
                less="Свернуть"
                // anchorClass="show-more-less-clickable"
                expanded={false}
                keepNewLines={false}
                // width={800}
                truncatedEndingComponent={'... '}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab
                  aspernatur atque autem cum deleniti dolorem et facere impedit
                  in laboriosam maiores mollitia nobis nostrum obcaecati odit
                  officia omnis pariatur quam quia reiciendis sapiente similique
                  tempore totam unde velit, voluptas.
                </p>
                <p>
                  Деньги денежки монетки бабосики копейки кэш лавешечку капусту
                  лавандосик золотишко слать мне на пальтишко:
                </p>
                <p>1234 1234 1234 123</p>
              </ShowMoreText>
            </Box>

            <Typography paddingLeft="1rem" marginTop="2rem">
              Комментарии
            </Typography>

            <Box
              className={styles.commentSection}
              backgroundColor={theme.palette.shadows.main}
            >
              {
                <Box className={styles.userCommentary}>
                  <Avatar />
                  <input
                    type="text"
                    className={styles.commentaryInput}
                    placeholder="Оставьте комментарий"
                  />
                </Box>
              }

              {/*<Typography variant={'body1'}>*/}
              {/*  Пока нет комментариев...*/}
              {/*</Typography>*/}

              <div>
                <VideoCommentary />
                <VideoCommentary />
                <VideoCommentary />
                <VideoCommentary />
                <VideoCommentary />
              </div>
            </Box>
          </Box>
        </Box>
        <Box
          // py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          {/*<VideoCard videos={videos} direction="column" />*/}
          {/*<VideoCard videos={videos} direction="column" />*/}
          {/*<VideoCard videos={videos} direction="column" />*/}
          {/*<VideoCard videos={videos} direction="column" />*/}
          {/*<VideoCard videos={videos} direction="column" />*/}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
