import { Typography } from '@mui/material';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PodcastSearch = () => (
  <Fragment>
    <Link to={'podcast/1'}>
      <Typography>Go to Podcast</Typography>
    </Link>
    <img src="/images/gato.jpg" alt="" />
  </Fragment>
);

export default PodcastSearch;
