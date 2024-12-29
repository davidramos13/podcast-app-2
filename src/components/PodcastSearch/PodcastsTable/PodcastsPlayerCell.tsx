import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC, memo, useCallback } from 'react';
import { PlayerCell } from '~/components/Player';
import { useShallowAppStore } from '~/store';
import { fetchLastPodcastEpisode } from '~/store/episodesApi';

type Props = { podcastId: number };
const PodcastsPlayerCell: FC<Props> = ({ podcastId }) => {
  const play = useShallowAppStore(state => state.play);
  const {
    data: podcastFull,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['lastPodcastEpisode', podcastId],
    queryFn: () => fetchLastPodcastEpisode(podcastId),
    enabled: false,
  });

  const episodeId = podcastFull ? podcastFull.episodes[0].id : 0;

  const onPlay = useCallback(() => {
    if (!podcastFull) {
      refetch();
    } else {
      play({ podcastFull });
    }
  }, []);

  if (isLoading) return <CircularProgress />;
  return <PlayerCell episodeId={episodeId} onPlay={onPlay} />;
};

export default memo(PodcastsPlayerCell);
