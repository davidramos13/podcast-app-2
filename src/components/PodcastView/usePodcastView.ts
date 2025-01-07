import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PodcastFull } from '~/entities/podcast';
import { useShallowAppStore } from '~/store';
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

  const goBack = () => navigate(-1);

  return { isLoading, podcastFull: data, filter, setFilter, goBack };
};

export default usePodcastView;
