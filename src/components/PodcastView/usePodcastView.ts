import { useState } from 'react';
import { useGetEpisodesQuery } from '~/store/episodesApi';

const usePodcastView = (id: number) => {
  const [filter, setFilter] = useState('');
  const { data, isLoading } = useGetEpisodesQuery(id, { skip: id <= 0 });

  const filterValue = filter.toLowerCase();

  const episodes = data?.episodes?.filter(x => x.title.toLowerCase().includes(filterValue)) || null;
  const podcast = data?.podcast || null;

  return { isLoading, episodes, podcast, filter, setFilter };
};

export default usePodcastView;
