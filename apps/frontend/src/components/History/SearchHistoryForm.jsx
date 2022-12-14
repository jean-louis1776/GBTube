import React from 'react';
import { Paper, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { setSearchString } from '../../store/slice';
import { useDispatch } from 'react-redux';

import styles from './SearchHistoryForm.module.scss';
import { searchStringSelector } from '../../store/selectors';

const SearchHistoryForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchStringSelector) dispatch(setSearchString(''));
  };

  return (
    <Paper
      className={styles.searchBar}
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: '10px' }}
    >
      <input
        className={styles.searchInput}
        placeholder="Искать в истории..."
        // value={searchStringSelector}
        onChange={(event) => dispatch(setSearchString(event.target.value))}
      />
    </Paper>
  );
};

export default SearchHistoryForm;
