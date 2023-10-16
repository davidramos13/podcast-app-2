import { FC, memo } from 'react';
import { Track } from '~/entities';
import { playPause } from '~/store/player/slice';
import { useAppDispatch, useAppSelector } from '~/store';
import PlayButton from '../ui/PlayButton';
import { selectPlayingEpisodeId } from '~/store/player/selectors';

type Props = { playlist: Track[]; episodeId: number };
const PlayerCell: FC<Props> = ({ playlist, episodeId, ...props }) => {
  const dispatch = useAppDispatch();
  const playing = useAppSelector(({ player }) => selectPlayingEpisodeId(player) === episodeId);

  const onClick = () => {
    dispatch(playPause({ playlist, selectedId: episodeId }));
  };

  return <PlayButton playing={playing} onClick={onClick} {...props} />;
};

export default memo(PlayerCell);
