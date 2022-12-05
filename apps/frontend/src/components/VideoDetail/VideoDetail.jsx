import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';
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
import ShowMoreText from 'react-show-more-text';
import styles from './VideoDetail.module.scss';
import { styled, useTheme } from '@mui/material/styles';
import VideoCommentary from '../VideoCommentary/VideoCommentary';
import VideoController from '../../controllers/VideoController';
import { VIDEO } from '@constants/frontend';
import { Player } from 'react-tuby';
import 'react-tuby/css/main.css';
import { shallowEqual, useSelector } from 'react-redux';
import { getUserId } from '../../store/selectors';

const VideoDetail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { idList } = useParams();
  const userId = useSelector(getUserId, shallowEqual);
  const [videoContent, setVideoContent] = useState(<Loader />);
  const [subscribe, setSubscribe] = useState(true);
  const [category, setCategory] = useState('');
  const [channelName, setChannelName] = useState('');
  const [createTimestamp, setCreateTimestamp] = useState('');
  const [description, setDescription] = useState('');
  const [dislikesCount, setDislikesCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [authorNickName, setAuthorNickName] = useState('');
  const [title, setTitle] = useState('');
  const [viewsCount, setViewsCount] = useState(0);

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

  // const likeOrDislikeHandler = (likes) =>
  //   likes.reduce((prev, cont) => (cont === prev ? null : cont), likes);

  // const currentReaction = likeOrDislikeHandler(reaction);

    useEffect(() => {
      setVideoContent(<Loader />);
      const fetchData = async () => {
        document.title = videoInfo.title;
        const videoInfo = await VideoController.getVideoInfo(idList.split('_').at(-1));
        setCategory(videoInfo.category);
        setChannelName(videoInfo.channelName);
        setCreateTimestamp((new Date(videoInfo.createTimestamp)).toLocaleDateString());
        setDescription(videoInfo.description);
        setDislikesCount(videoInfo.dislikesCount);
        setLikesCount(videoInfo.likesCount);
        setAuthorNickName(videoInfo.nickName);
        setTitle(videoInfo.title);
        setViewsCount(videoInfo.viewsCount);
        console.log(videoInfo, 'VideoDataInfo');
        const { hashName } = await VideoController.getVideoName(idList.split('_').at(-1));
        console.log('hashName', hashName);
        const videoId = idList.split('_').at(-1);
        const url = `http://localhost:3333/api/video/download?hash_name=${hashName}&user_id=${userId}&video_id=${videoId}`
        setVideoContent(
          <Player src={url}/>
        );
      }

      fetchData().catch(() => {
        setVideoContent(<p style={{color: 'white'}}>Видео не найдено</p>);
        console.log('Fail get hashName video');
      });
    }, []);

  // if (!videoDetail?.snippet) return <Loader />;
  //
  // const {
  //   snippet: { title, channelId, channelTitle, publishedAt },
  //   statistics: { viewCount, likeCount },
  // } = videoDetail;

  const handleDeleteVideo = async () => {
    try {
      await VideoController.deleteVideo(idList.split('_').at(-1));
      navigate(`/${VIDEO}/get_all/${idList.split('_').slice(0, -1).join('_')}`, { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box className={styles.wrapper}>
      <Header />
      <Stack direction={{ xs: 'column', md: 'row' }} className={styles.stack}>
        <Box>
          <Box>
            {
              <div className={styles.playerWrapper}>
                {videoContent}
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
                {title}
              </Typography>
              <Typography variant={'body1'} sx={{ opacity: 0.85 }}>
                {viewsCount} просмотров
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
                      {channelName}
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
              <Button onClick={handleDeleteVideo}>Удалить видео</Button>
              <Stack direction="row" gap="10px">
                <Stack
                  direction="row"
                  gap="10px"
                  className={styles.reactionsBtn}
                >
                  <Tooltip title="Нравится">
                    <ReactionButton
                      // onClick={() => dispatch(setReaction('Like'))}
                    >
{/*                      {currentReaction === 'Like' ? (
                        <ThumbUp
                          sx={{
                            color: theme.palette.coplimentPink.main,
                          }}
                        />
                      ) : (
                        <ThumbUpOutlined />
                      )}*/}
                      <Typography
                        variant={'body1'}
                        sx={{ opacity: 0.7 }}
                        marginLeft={2}
                      >
                        {likesCount}{' '}
                      </Typography>
                    </ReactionButton>
                  </Tooltip>
                  <Tooltip title="Не нравится">
                    <ReactionButton
                      // onClick={() => dispatch(setReaction('Dislike'))}
                    >
{/*                      {currentReaction === 'Dislike' ? (
                        <ThumbDown
                          sx={{
                            color: theme.palette.coplimentPink.main,
                          }}
                        />
                      ) : (
                        <ThumbDownOutlined />
                      )}*/}
                      <Typography
                        variant="body1"
                        sx={{ opacity: 0.7 }}
                        marginLeft={2}
                      >
                        {dislikesCount}{' '}
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
              <Box variant="body1" sx={{ opacity: 0.7 }}>
                <Typography variant={'body1'} sx={{ opacity: 0.7 }}>
                  Дата публикации: {createTimestamp}
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
                {description}
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
          {/*<VideoGrid />*/}
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
