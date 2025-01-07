import { Fragment } from 'react';
import usePodcastSearch from './usePodcastSearch';
import { SearchBar, Table } from '../ui';
import Spinner from '../ui/Spinner';
import Header from '../ui/Header';
import columns from './PodcastsTable/columns';

const PodcastSearch = () => {
  const { filter, onChangeFilter, data, isLoading } = usePodcastSearch();

  return (
    <Fragment>
      <Header>
        <SearchBar filter={filter} setFilter={onChangeFilter} />
      </Header>
      {isLoading ? <Spinner /> : data && <Table columns={columns} data={data} />}
    </Fragment>
  );
};

export default PodcastSearch;
