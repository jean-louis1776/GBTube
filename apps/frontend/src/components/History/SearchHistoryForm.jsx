import React, { useState } from 'react';
import { Paper, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchHistoryForm.module.scss';

const SearchHistoryForm = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      setSearchTerm('');
      console.log(searchTerm);
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
        placeholder="Искать в истории..."
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

export default SearchHistoryForm;
