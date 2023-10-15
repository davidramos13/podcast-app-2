import { Fragment } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import usePodcastSearch from './usePodcastSearch';
import { SearchBar } from '../ui';
import PodcastsTable from './PodcastsTable';

const PodcastSearch = () => {
  const { filter, onChangeFilter, data, isLoading } = usePodcastSearch();

  return (
    <Fragment>
      <SearchBar filter={filter} setFilter={onChangeFilter} />
      {isLoading ? <CircularProgress /> : data && <PodcastsTable data={data} />}
    </Fragment>
  );
};

export default PodcastSearch;
