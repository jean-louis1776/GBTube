import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import {
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from '@mui/icons-material';
import React, { useEffect, useMemo, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CommentController from '../../controllers/CommentController';
import AnswerController from '../../controllers/AnswerController';

import { shallowEqual, useSelector } from 'react-redux';
import { getAuthStatus, getUserId } from '../../store/selectors';

import styles from './VideoCommentary.module.scss';
import { styled, useTheme } from '@mui/material/styles';
import CommentAnswers from './CommentAnswers';
import { API_URL } from '@constants/frontend';

const VideoCommentary = ({
  commentData,
  currentUserId,
  videoOwnerId,
  handleDelete,
  commentId,
}) => {
  const [isVisibleSetAnswer, setIsVisibleSetAnswer] = useState(false);
  const theme = useTheme();
  const [date, _] = useState(new Date(commentData.createdTimestamp));
  const userId = useSelector(getUserId, shallowEqual);
  const [dislikesCount, setDislikesCount] = useState(commentData.dislikesCount);
  const [likesCount, setLikesCount] = useState(commentData.likesCount);
  const [currentReaction, setCurrentReaction] = useState(commentData.grade);
  const [answerText, setAnswerText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isShownAllAnswers, setIsShownAllAnswers] = useState(false);
  const [answerId, setAnswerId] = useState('');
  const currentCommentId = useMemo(() => {
    return commentData.idList.split('_').at(-1);
  }, [commentData]);
  const isAuth = useSelector(getAuthStatus, shallowEqual);

  const getAllAnswers = async () => {
    const answers = await AnswerController.getAllItems(
      currentCommentId,
      userId
    );
    setAnswers(answers);
  };
  useEffect(() => {
    getAllAnswers();
  }, []);

  const CommentButton = styled(Button)(({ theme }) => ({
    padding: '7px 15px',
    transition: '.4s ease',
    color: theme.palette.whiteButton.main,
    '&:hover': {
      backgroundColor: theme.palette.coplimentPink.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  const CancelButton = styled(Button)(({ theme }) => ({
    padding: '7px 15px',
    transition: '.4s ease',
    '&:hover': {
      backgroundColor: theme.palette.baseBlue.main,
      color: theme.palette.baseBlue.contrastText,
    },
  }));

  const ReactionButton = styled(Button)(({ theme }) => ({
    borderRadius: '40px',
    transition: '.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.shadows.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  const isMayRemove = () => {
    return (
      currentUserId === String(commentData.userId) ||
      currentUserId === videoOwnerId
    );
  };

  const handleHideAnswer = () => {
    setIsVisibleSetAnswer(false);
  };
  const handleToggleVisibleAnswer = () => {
    setIsVisibleSetAnswer((prev) => !prev);
  };

  const handleShowAnswers = () => {
    setIsShownAllAnswers((prev) => !prev);
  };

  const handleChangeAnswerText = (evt) => {
    setAnswerText(evt.target.value);
  };

  const handleSendAnswerToComment = async () => {
    console.log('Send comment');
    try {
      const { data: answerId } = await AnswerController.send(
        commentData.idList,
        userId,
        answerText.trim()
      );
      setAnswerText('');
      setAnswerId(answerId);
      const answers = await AnswerController.getAllItems(+commentId, userId);
      setAnswers(answers);
      setIsVisibleSetAnswer((prev) => !prev);
    } catch (err) {
      console.log('Send comment error');
      console.log(err);
    }
  };

  const enterHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      handleSendAnswerToComment();
    }
  };

  const isCommentEmpty = () => answerText.length === 0;

  const handleDeleteAnswer = (answer) => async () => {
    // const currrentAnswerId = answer.idList.split('_').at(-1);
    try {
      await AnswerController.delete(answerId);
      const newAnswers = await AnswerController.getAllItems(+commentId, userId);
      setAnswers(newAnswers);
    } catch (err) {
      console.log(`Failed delete answer ${answerId}`);
      console.log(err);
    }
  };

  const handleLikeReaction = async () => {
    try {
      const { data: status } = await CommentController.like(+commentId, userId);

      if (status && currentReaction === '') {
        setLikesCount(likesCount + 1);
        setCurrentReaction('like');
      } else if (status && currentReaction === 'dislike') {
        setDislikesCount(dislikesCount - 1);
        setLikesCount(likesCount + 1);
        setCurrentReaction('like');
      } else {
        setLikesCount(likesCount - 1);
        setCurrentReaction('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislikeReaction = async () => {
    try {
      const { data: status } = await CommentController.dislike(
        +commentId,
        userId
      );

      if (status && currentReaction === '') {
        setDislikesCount(dislikesCount + 1);
        setCurrentReaction('dislike');
      } else if (status && currentReaction === 'like') {
        setLikesCount(likesCount - 1);
        setDislikesCount(dislikesCount + 1);
        setCurrentReaction('dislike');
      } else {
        setDislikesCount(dislikesCount - 1);
        setCurrentReaction('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack direction="column" marginBottom={3}>
      <Box className={styles.comment}>
        <Box className={styles.avatar}>
          {/*<Link to="/user/:id">*/}
          <Avatar alt="avatar" src={`${API_URL}/user/avatar/${userId}`} />
          {/*</Link>*/}
        </Box>
        <Box sx={{ width: '100%' }}>
          <Stack direction="row" alignItems="center">
            {/*<Link to="/user/:id">*/}
            <Typography variant="subtitle1">{commentData.nickName}</Typography>
            {/*</Link>*/}
            <Typography
              variant={'caption'}
              fontSize=".7rem"
              marginLeft="10px"
              sx={{ userSelect: 'none', opacity: 0.6 }}
            >
              Опубликовано: {date.toLocaleDateString()}
            </Typography>
          </Stack>
          <ShowMoreText
            className={styles.truncateText}
            lines={2}
            more="Читать далее"
            less="Свернуть"
            // anchorClass="show-more-less-clickable"
            expanded={false}
            keepNewLines={true}
            // width={800}
            truncatedEndingComponent={'... '}
          >
            {commentData.description}
          </ShowMoreText>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip title="Нравится">
              <ReactionButton onClick={handleLikeReaction} disabled={!isAuth}>
                {currentReaction === 'like' ? (
                  <ThumbUp
                    sx={{
                      color: theme.palette.coplimentPink.main,
                    }}
                  />
                ) : (
                  <ThumbUpOutlined
                    sx={{
                      color: theme.palette.whiteButton.main,
                    }}
                  />
                )}
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
                onClick={handleDislikeReaction}
                disabled={!isAuth}
              >
                {currentReaction === 'dislike' ? (
                  <ThumbDown
                    sx={{
                      color: theme.palette.baseBlue.main,
                    }}
                  />
                ) : (
                  <ThumbDownOutlined
                    sx={{
                      color: theme.palette.whiteButton.main,
                    }}
                  />
                )}
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7 }}
                  marginLeft={2}
                >
                  {dislikesCount}{' '}
                </Typography>
              </ReactionButton>
            </Tooltip>
            <CommentButton
              onClick={handleToggleVisibleAnswer}
              disabled={!isAuth}
            >
              Ответить
            </CommentButton>
            {isMayRemove() && (
              <Button
                size="large"
                onClick={handleDelete}
                variant="text"
                color="baseBlue"
              >
                Удалить
              </Button>
            )}
          </Box>
          {isVisibleSetAnswer ? (
            <Box sx={{ display: 'flex' }} className={styles.comment_answer}>
              <input
                className={styles.comment_inputField}
                onChange={handleChangeAnswerText}
                value={answerText}
                onKeyDown={enterHandler}
                placeholder="Оставьте ответ"
              />
              <Box gap="30px" className={styles.comment_btn}>
                <CommentButton
                  disabled={isCommentEmpty()}
                  onClick={handleSendAnswerToComment}
                >
                  Отправить
                </CommentButton>
                <CancelButton onClick={handleHideAnswer}>Отмена</CancelButton>
              </Box>
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Box>
      <Box>
        {!!answers?.length && (
          <IconButton onClick={handleShowAnswers} sx={{ borderRadius: '40px' }}>
            <Typography variant="subtitle1" sx={{ pl: '8px' }}>
              {isShownAllAnswers ? 'Скрыть' : 'Показать'} все ответы (
              {`${answers.length}`})
            </Typography>
            {isShownAllAnswers ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
        )}
      </Box>
      {isShownAllAnswers && (
        <Box>
          {answers?.length > 0 &&
            answers?.map((answer, index) => (
              <CommentAnswers
                key={index}
                answerData={answer}
                currentUserId={userId}
                videoOwnerId={videoOwnerId}
                answerId={answerId}
                handleDelete={handleDeleteAnswer(answer)}
              />
            ))}
        </Box>
      )}
    </Stack>
  );
};

export default VideoCommentary;
