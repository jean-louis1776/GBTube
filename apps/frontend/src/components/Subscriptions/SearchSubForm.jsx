import React, { useState } from 'react';
import { Paper, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchSubForm.module.scss';

const SearchSubForm = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      setSearchTerm('');
    }
  };

  return (
    <Paper
      className={styles.searchBar}
      component="form"
      onSubmit={handleSubmit}
    >
      <input
        className={styles.searchInput}
        placeholder="Искать в подписках..."
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

export default SearchSubForm;
