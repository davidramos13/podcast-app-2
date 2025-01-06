import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { memo, useCallback } from 'react';
import { PlayerCell } from '~/components/Player';
import { useShallowAppStore } from '~/store';
import { fetchLastPodcastEpisode } from '~/store/episodesApi';

type Props = { podcastId: number };
function PodcastsPlayerCell({ podcastId }: Props) {
  const play = useShallowAppStore(state => state.play);
  const {
    data: podcastFull,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['lastPodcastEpisode', podcastId],
    queryFn: () => fetchLastPodcastEpisode(podcastId),
    enabled: false,
  });

  const episodeId = podcastFull ? podcastFull.episodes[0].id : 0;

  const onPlay = useCallback(async () => {
    let podcast = podcastFull;
    if (!podcast) {
      const { data } = await refetch();
      podcast = data;
    }
    play({ podcastFull: podcast });
  }, []);

  if (isFetching) return <CircularProgress />;
  return <PlayerCell episodeId={episodeId} onPlay={onPlay} />;
}

export default memo(PodcastsPlayerCell);
