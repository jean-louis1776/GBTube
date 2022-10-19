import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import './SearchForm.scss';

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
      className="search-bar"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 20,
        border: '1px solid #cecece',
        background: '#fff',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
      }}
    >
      <input
        className="search-input"
        placeholder="Искать..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton
        className="search-btn"
        type="submit"
        sx={{ p: '10px', color: '#fc1503' }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchForm;
