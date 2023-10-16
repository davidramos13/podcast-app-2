import { CircularProgress } from '@mui/material';
import { FC, memo } from 'react';
import { PlayerCell } from '~/components/Player';
import PlayButton from '~/components/ui/PlayButton';
import { mapTrack } from '~/entities/track';
import { useLazyGetLastPodcastEpisodeQuery } from '~/store/episodesApi';

type Props = { podcastId: number };
const PodcastsPlayerCell: FC<Props> = props => {
  const [getEpisode, { data, isLoading }] = useLazyGetLastPodcastEpisodeQuery();

  const onClick = () => {
    getEpisode(props.podcastId);
  };

  if (isLoading) return <CircularProgress />;
  if (!data) return <PlayButton onClick={onClick} playing={false} />;

  const track = mapTrack(data.episode);

  return <PlayerCell playlist={[track]} episodeId={track.episodeId} />;
};

export default memo(PodcastsPlayerCell);
