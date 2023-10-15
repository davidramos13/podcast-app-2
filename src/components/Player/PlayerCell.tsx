import { FC } from 'react';
import { Episode } from '~/entities';
import { playPause } from '~/store/player/slice';
import { useAppDispatch, useAppSelector } from '~/store';
import PlayButton from '../ui/PlayButton';

type Props = { episodes: Episode[]; episodeId: number };
const PlayerCell: FC<Props> = ({ episodes, episodeId }) => {
  const dispatch = useAppDispatch();
  const playing = useAppSelector(
    ({ player }) => player.playing && player.episodes[player.currentIndex].id === episodeId,
  );

  const onClick = () => {
    dispatch(playPause({ episodes, selectedId: episodeId }));
  };

  return <PlayButton playing={playing} onClick={onClick} />;
};

export default PlayerCell;
