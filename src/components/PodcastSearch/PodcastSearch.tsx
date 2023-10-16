import { Fragment } from 'react';
import usePodcastSearch from './usePodcastSearch';
import { SearchBar } from '../ui';
import PodcastsTable from './PodcastsTable';
import Spinner from '../ui/Spinner';
import Header from '../ui/Header';

const PodcastSearch = () => {
  const { filter, onChangeFilter, data, isLoading } = usePodcastSearch();

  return (
    <Fragment>
      <Header>
        <SearchBar filter={filter} setFilter={onChangeFilter} />
      </Header>
      {isLoading ? <Spinner /> : data && <PodcastsTable data={data} />}
    </Fragment>
  );
};

export default PodcastSearch;
