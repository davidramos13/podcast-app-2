import { CircularProgress } from '@mui/material';
import { FC, memo } from 'react';
import { PlayerCell } from '~/components/Player';
import PlayButton from '~/components/ui/PlayButton';
import { useLazyGetLastPodcastEpisodeQuery } from '~/store/episodesApi';

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
