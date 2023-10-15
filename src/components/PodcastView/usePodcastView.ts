import { useState } from 'react';
import { useGetEpisodesQuery } from '~/store/episodesApi';

const usePodcastView = (id: number) => {
  const [filter, setFilter] = useState('');
  const { data: requestData, isLoading } = useGetEpisodesQuery(id, { skip: id <= 0 });

  const filterValue = filter.toLowerCase();
  const data = requestData?.filter(x => x.title.toLowerCase().includes(filterValue)) || null;

  return { isLoading, data, filter, setFilter };
};

export default usePodcastView;
