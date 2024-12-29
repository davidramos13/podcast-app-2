import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PodcastFull } from '~/entities/podcast';
import { fetchEpisodes } from '~/store/episodesApi';

const usePodcastView = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const id = parseInt(podcastId!) || 0;

  const [filter, setFilter] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['episodes', podcastId],
    queryFn: () => fetchEpisodes(id),
    enabled: id > 0,
  });
  // const data = useAppSelector(({ player }) => player.viewPodcast);

  const goBack = () => navigate(-1);

  const filterValue = filter.toLowerCase();

  let podcastFull: PodcastFull | null = null;
  if (data) {
    const { episodes, ...podcast } = data;
    podcastFull = {
      ...podcast,
      episodes: episodes.filter(x => x.title.toLowerCase().includes(filterValue)),
    };
  }

  return { isLoading, podcastFull, filter, setFilter, goBack };
};

export default usePodcastView;
