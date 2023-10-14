import CircularProgress from '@mui/material/CircularProgress';
import { Fragment } from 'react';
import SearchBar from '../ui/SearchBar';
import usePodcastSearch from './usePodcastSearch';
import SearchResults from './SearchResults';

const PodcastSearch = () => {
  const { filter, onChangeFilter, data, isLoading } = usePodcastSearch();

  return (
    <Fragment>
      <SearchBar filter={filter} setFilter={onChangeFilter} />
      {isLoading ? <CircularProgress /> : data && <SearchResults podcasts={data} />}
    </Fragment>
  );
};

export default PodcastSearch;
