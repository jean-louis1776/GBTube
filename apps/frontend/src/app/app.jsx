import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Box } from '@mui/material';

import {
  Header,
  LoginForm,
  MainPage,
  SearchFeed,
  SignupForm,
} from '../components';

export function App() {
  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Box>
  );
}
export default App;
