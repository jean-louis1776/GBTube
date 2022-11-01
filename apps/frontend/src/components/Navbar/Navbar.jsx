import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { categories } from '@constants/frontend';

import styles from './Navbar.module.scss';

const Navbar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: 'auto',
        height: { sx: 'auto' },
        flexDirection: { md: 'column' },
      }}
    >
      {categories.map((category) => (
        <Link to={category.link}>
          <button
            className={styles.categoryBtn}
            onClick={() => {
              setSelectedCategory(selectedCategory);
            }}
            style={{
              background: category.name === selectedCategory && '#fc1503',
              color: category.name === selectedCategory ? '#fff' : '#000',
            }}
            key={category.name}
          >
            <span
              style={{
                color: category.name === selectedCategory ? '#fff' : '#fc1503',
                marginRight: '15px',
              }}
            >
              {category.icon}
            </span>
            <span
              style={{
                opacity: category.name === selectedCategory ? '1' : '0.8',
              }}
            >
              {category.name}
            </span>
          </button>
        </Link>
      ))}
      <Divider />
      <Typography className={styles.playlist}>
        <PlaylistPlayIcon className={styles.playlistIcon} />
        Плейлисты
      </Typography>
    </Stack>
  );
};

export default Navbar;
