import { Avatar, Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import { ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import styles from './VideoCommentary.module.scss';
import { styled } from '@mui/material/styles';
import CommentAnswers from './CommentAnswers';

const VideoCommentary = ({commentData, currentUserId, videoOwnerId, handleDelete}) => {
  const [isVisibleSetAnswer, setIsVisibleSetAnswer] = useState(false);
  const date = useRef(new Date(commentData.createdTimestamp));

  const CommentButton = styled(Button)(({ theme }) => ({
    padding: '7px 15px',
    borderRadius: '40px',
    backgroundColor: theme.palette.shadows.main,
    transition: '.4s ease',
    '&:hover': {
      backgroundColor: theme.palette.coplimentPink.main,
      color: theme.palette.coplimentPink.contrastText,
    },
  }));

  const CancelButton = styled(Button)(({ theme }) => ({
    padding: '7px 15px',
    borderRadius: '40px',
    backgroundColor: theme.palette.shadows.main,
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
    return !(currentUserId === String(commentData.userId) || currentUserId === videoOwnerId);
  }

  const handleHideAnswer = () => {setIsVisibleSetAnswer(false)};
  const handleToggleVisibleAnswer = () => {setIsVisibleSetAnswer(!isVisibleSetAnswer)};

  return (
    <Stack direction="column" marginBottom={3}>
      <Box className={styles.comment}>
        <Box className={styles.avatar}>
          <Link to="/user/:id">
            <Avatar />
          </Link>
        </Box>
        <Box>
          <Stack direction="row" alignItems="center">
            <Link to="/user/:id">
              <Typography variant="subtitle1">{commentData.nickName}</Typography>
            </Link>
            <Typography
              variant={'overline'}
              fontSize=".6rem"
              fontWeight="200"
              marginLeft="10px"
            >
             Дата публикации: {date.current.toLocaleDateString()}
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
          <Box>
            <Tooltip title="Нравится">
              <ReactionButton>
                <ThumbUpOutlined />
              </ReactionButton>
            </Tooltip>
            <Tooltip title="Не нравится">
              <ReactionButton>
                <ThumbDownOutlined />
              </ReactionButton>
            </Tooltip>
            <CommentButton onClick={handleToggleVisibleAnswer}>Ответить</CommentButton>
            <IconButton size='large' disabled={isMayRemove()} onClick={handleDelete} variant="contained">
              <DeleteForeverIcon/>
            </IconButton>
          </Box>
          {isVisibleSetAnswer ? <Box sx={{display: 'flex'}} className={styles.comment_answer}>
            <input className={styles.comment_inputField} />
            <Box gap="30px" className={styles.comment_btn}>
              <CommentButton>Отправить</CommentButton>
              <CancelButton onClick={handleHideAnswer}>Отмена</CancelButton>
            </Box>
          </Box> : ''}
        </Box>
      </Box>
      {/*<Box>*/}
        <IconButton>
          <ArrowDropDownIcon/><ArrowDropUpIcon/>Ответов
        </IconButton>
      {/*</Box>*/}
      {/*<CommentAnswers/>*/}
    </Stack>
  );
};

export default VideoCommentary;
