import { Avatar, Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import { ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import React, { useState } from 'react';

import styles from './VideoCommentary.module.scss';
import { styled } from '@mui/material/styles';

const VideoCommentary = () => {
  const [answer, setAnswer] = useState(false);

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
              <Typography variant="subtitle1">UserName</Typography>
            </Link>
            <Typography
              variant={'overline'}
              fontSize=".6rem"
              fontWeight="200"
              marginLeft="10px"
            >
              2 месяца назад
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
            lorem ipsum dolor sit amet, consectetur adipisicing elit. A cum
            cupiditate in, necessitatibus, neque nostrum, nulla officia omnis
            qui rerum tempora vel veritatis! Ab adipisci error fuga iusto magnam
            numquam quae reiciendis reprehenderit, sequi voluptate. Adipisci
            blanditiis consequatur, distinctio ipsum labore laborum nesciunt non
            pariatur quo sit unde voluptas voluptates? lorem ipsum dolor sit
            amet, consectetur adipisicing elit. A cum cupiditate in,
            necessitatibus, neque nostrum, nulla officia omnis qui rerum tempora
            vel veritatis! Ab adipisci error fuga iusto magnam numquam quae
            reiciendis reprehenderit, sequi voluptate. Adipisci blanditiis
            consequatur, distinctio ipsum labore laborum nesciunt non pariatur
            quo sit unde voluptas voluptates?
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
            <CommentButton onClick={() => setAnswer((prevState) => !prevState)}>
              Ответить
            </CommentButton>
          </Box>
          <Box
            sx={{ display: answer ? 'flex' : 'none' }}
            className={styles.comment_answer}
          >
            <input className={styles.comment_inputField} />
            <Box gap="30px" className={styles.comment_btn}>
              <CommentButton>Отправить</CommentButton>
              <CancelButton onClick={() => setAnswer(false)}>
                Отмена
              </CancelButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default VideoCommentary;
