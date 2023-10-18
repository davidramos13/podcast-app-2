import { FC, memo, useCallback } from 'react';
import { useAppSelector } from '~/store';
import PlayButton from '../ui/PlayButton';
import { selectIsPlayingThisEpisode } from '~/store/player/selectors';

type Props = { episodeId: number; onPlay: () => void };
const PlayerCell: FC<Props> = ({ episodeId, onPlay, ...props }) => {
  const playing = useAppSelector(state => selectIsPlayingThisEpisode(state, episodeId));

  const onInternalClick = useCallback(onPlay, [onPlay]);
  return <PlayButton playing={playing} onPlay={onInternalClick} {...props} />;
};

export default memo(PlayerCell);
