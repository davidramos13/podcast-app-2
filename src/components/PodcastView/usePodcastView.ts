import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PodcastFull } from '~/entities/podcast';
import { useAppSelector } from '~/store';
import { useGetEpisodesQuery } from '~/store/episodesApi';

const usePodcastView = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  const id = parseInt(podcastId!) || 0;

  const [filter, setFilter] = useState('');
  const { isLoading } = useGetEpisodesQuery(id, { skip: id <= 0 });
  const data = useAppSelector(({ player }) => player.viewPodcast);

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
