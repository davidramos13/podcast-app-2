import { memo, useCallback } from 'react';
import { useShallowAppStore } from '~/store';
import PlayButton from '../ui/PlayButton';
import { selectIsPlayingThisEpisode } from '~/store/player/selectors';

type Props = { episodeId: number; onPlay: () => void };

function PlayerCell({ episodeId, onPlay }: Props) {
  const playing = useShallowAppStore(selectIsPlayingThisEpisode(episodeId));

  const onInternalClick = useCallback(onPlay, [onPlay]);
  return <PlayButton playing={playing} onPlay={onInternalClick} />;
}

export default memo(PlayerCell);
