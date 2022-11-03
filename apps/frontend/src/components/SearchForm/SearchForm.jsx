import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchForm.module.scss';

const SearchForm = (props) => {
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
        borderRadius: 20,
        border: '1px solid #cecece',
        background: '#fff',
        pl: 2,
        boxShadow: 'none',
        // mr: { sm: 5 },
      }}
    >
      <input
        className={styles.searchInput}
        placeholder="Искать..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Tooltip title="Поиск">
        <IconButton
          className={styles.searchBtn}
          type="submit"
          sx={{ p: '10px', color: '#fc1503' }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default SearchForm;
