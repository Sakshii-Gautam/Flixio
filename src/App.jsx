import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import {
  Actors,
  MovieInformation,
  Movies,
  NavBar,
  Profile,
  TvInformation,
  Browse,
  TvShows,
} from './components';
import { root, content, toolbar } from './styles';

const App = () => {
  return (
    <Box sx={root}>
      <NavBar sx={toolbar} />

      <CssBaseline />

      <main style={{ width: '100%' }}>
        <Box sx={content} />

        <Routes>
          <Route path='/' element={<Movies />} />

          <Route path='/approved' element={<Movies />} />

          <Route path='/movie/:id' element={<MovieInformation />} />

          <Route path='/tv' element={<TvShows />} />

          <Route path='/tv/:id' element={<TvInformation />} />

          <Route path='/browse' element={<Browse />} />

          <Route path='/profile/:id' element={<Profile />} />

          <Route path='/person/:id' element={<Actors />} />
        </Routes>
      </main>
    </Box>
  );
};

export default App;
