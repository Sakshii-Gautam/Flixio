import { ExitToApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/authSlice';
import { RatedCards } from '..';
import { getFavoritesList, getWatchlist } from '../../services/tmdb';
import { getTvShowFavoritesList, getTvShowWatchlist } from '../../services/tv';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allFavorites, setAllFavorites] = useState([]);
  const [allWatchlist, setAllWatchlist] = useState([]);

  const logout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  useEffect(() => {
    const data = {
      accountId: user.id,
      sessionId: localStorage.getItem('session_id'),
      page: 1,
    };
    // Getting all the favorites and watchlists by Movie and Shows
    const fetchLists = async () => {
      try {
        const results = await Promise.all([
          dispatch(getFavoritesList(data)),
          dispatch(getWatchlist(data)),
          dispatch(getTvShowFavoritesList(data)),
          dispatch(getTvShowWatchlist(data)),
        ]);

        setAllFavorites([
          ...results[0]?.payload?.results,
          ...results[1]?.payload?.results,
        ]);

        setAllWatchlist([
          ...results[2]?.payload?.results,
          ...results[3]?.payload?.results,
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLists();
  }, []);

  return (
    <Box sx={{ p: '1.3rem' }}>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' gutterBottom>
          My Profile
        </Typography>
        <Button color='inherit' onClick={logout}>
          Logout &nbsp; <ExitToApp />{' '}
        </Button>
      </Box>

      {!allFavorites?.length && !allWatchlist?.length ? (
        //If no favorites or watchlist added
        <Typography variant='h5'>
          Add Favorites or Watchlist some Movies/TV Shows to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title='Favorite Movies And Shows' data={allFavorites} />
          <RatedCards
            title='Watchlisted Movies And Shows'
            data={allWatchlist}
          />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
