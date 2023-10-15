import { FC, memo } from 'react';
import { Episode } from '~/entities';
import { playPause } from '~/store/player/slice';
import { useAppDispatch, useAppSelector } from '~/store';
import PlayButton from '../ui/PlayButton';
import { selectPlayingEpisodeId } from '~/store/player/selectors';

type Props = { episodes: Episode[]; episodeId: number };
const PlayerCell: FC<Props> = ({ episodes, episodeId }) => {
  const dispatch = useAppDispatch();
  const playing = useAppSelector(({ player }) => selectPlayingEpisodeId(player) === episodeId);

  const onClick = () => {
    dispatch(playPause({ episodes, selectedId: episodeId }));
  };

  return <PlayButton playing={playing} onClick={onClick} />;
};

export default memo(PlayerCell);
