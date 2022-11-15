import { Avatar, Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import { ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import React, { useState } from 'react';

import styles from './VideoCommentary.module.scss';

const VideoCommentary = () => {
  const [answer, setAnswer] = useState(false);

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
              <Button>
                <ThumbUpOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Не нравится">
              <Button>
                <ThumbDownOutlined />
              </Button>
            </Tooltip>
            <Button onClick={() => setAnswer((prevState) => !prevState)}>
              Ответить
            </Button>
          </Box>
          <Box
            sx={{ display: answer ? 'block' : 'none' }}
            className={styles.comment_answer}
          >
            <input className={styles.comment_inputField} />
            <Button>Отправить</Button>
            <Button>Отмена</Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default VideoCommentary;
