import { memo } from 'react';
import { PlayerCell } from '~/components/Player';
import { PodcastFull } from '~/entities';
import { useShallowAppStore } from '~/store';

type Props = { episodeId: number; podcastFull: PodcastFull };
function EpisodesPlayerCell({ episodeId, podcastFull, ...props }: Props) {
  const play = useShallowAppStore(state => state.play);
  const onPlay = () => play({ episodeId, podcastFull });
  return <PlayerCell episodeId={episodeId} onPlay={onPlay} {...props} />;
}

export default memo(EpisodesPlayerCell);
