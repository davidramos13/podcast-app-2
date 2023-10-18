import { CircularProgress } from '@mui/material';
import { FC, memo, useCallback } from 'react';
import { PlayerCell } from '~/components/Player';
import { useAppDispatch } from '~/store';
import { useLazyGetLastPodcastEpisodeQuery } from '~/store/episodesApi';
import { play } from '~/store/player/slice';

type Props = { podcastId: number };
const PodcastsPlayerCell: FC<Props> = ({ podcastId }) => {
  const [getEpisode, { data: podcastFull, isLoading }] = useLazyGetLastPodcastEpisodeQuery();
  const dispatch = useAppDispatch();
  const episodeId = podcastFull ? podcastFull.episodes[0].id : 0;

  const onPlay = useCallback(() => {
    if (!podcastFull) {
      getEpisode(podcastId, true);
    } else {
      dispatch(play({ podcastFull }));
    }
  }, [dispatch, getEpisode, podcastFull, podcastId]);

  if (isLoading) return <CircularProgress />;
  return <PlayerCell episodeId={episodeId} onPlay={onPlay} />;
};

export default memo(PodcastsPlayerCell);
