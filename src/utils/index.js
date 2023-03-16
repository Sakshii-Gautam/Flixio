import axios from 'axios';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

const baseUrl = 'https://api.themoviedb.org/3';

export const fetchToken = async () => {
  try {
    //Fetching the request token
    const { data } = await axios.get(
      `${baseUrl}/authentication/token/new?api_key=${tmdbApiKey}`
    );
    const token = data.request_token;

    //Redirecting the user
    if (data.success) {
      localStorage.setItem('request_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');
  const { data } = await axios.post(
    `${baseUrl}/authentication/session/new?api_key=${tmdbApiKey}`,
    { request_token: token }
  );
  localStorage.setItem('session_id', data.session_id);
  return data.session_id;
};
