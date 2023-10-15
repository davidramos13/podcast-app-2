import { CircularProgress } from '@mui/material';
import { FC, memo } from 'react';
import { useLazyGetLastPodcastEpisodeQuery } from '~/store/episodesApi';
import { PlayerCell } from '../Player';
import PlayButton from '../ui/PlayButton';

type Props = { podcastId: number };
const PodcastsPlayerCell: FC<Props> = props => {
  const [getEpisode, { data, isLoading }] = useLazyGetLastPodcastEpisodeQuery();

  const onClick = () => {
    getEpisode(props.podcastId);
  };

  if (isLoading) return <CircularProgress />;
  if (!data) return <PlayButton onClick={onClick} playing={false} />;

  return <PlayerCell episodes={[data]} episodeId={data.id} />;
};

export default memo(PodcastsPlayerCell);
