import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchForm.module.scss';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Paper
      className={styles.searchBar}
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 6,
        pl: 2,
        boxShadow: 'none',
      }}
    >
      <input
        className={styles.searchInput}
        placeholder="Искать на GeekTube..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Tooltip title="Поиск">
        <IconButton
          className={styles.searchBtn}
          type="submit"
          sx={{ p: '10px', color: 'baseBlue.main' }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default SearchForm;
