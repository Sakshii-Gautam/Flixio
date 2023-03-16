export const featuredCardContainer = {
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  textDecoration: 'none',
  height: { xs: '30vh', sm: '40vh', md: '50vh' },
};

export const card = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  position: 'relative',
};

export const cardMedia = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.575)',
  backgroundBlendMode: 'darken',
};

export const cardContent = {
  color: '#fff',
  width: { xs: '95%', sm: '95%', md: '70%' },
  position: 'relative',
  backgroundColor: 'transparent',
};

export const featuredCardText = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  WebkitLineClamp: { xs: '2', sm: '2', md: '3', lg: '4' },
  lineHeight: '1.5rem',
  maxHeight: { xs: '5rem', sm: '5rem', md: '10rem' },
};

export const featuredCardTitle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  WebkitLineClamp: { xs: '1', sm: '1', md: '2' },
  lineHeight: '1.5rem',
  maxHeight: { xs: '5rem', sm: '5rem', md: '10rem' },
};
