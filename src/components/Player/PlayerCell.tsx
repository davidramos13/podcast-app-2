import { FC, memo } from 'react';
import { Episode } from '~/entities';
import { playPause } from '~/store/player/slice';
import { useAppDispatch, useAppSelector } from '~/store';
import PlayButton from '../ui/PlayButton';
import { selectPlayingEpisodeId } from '~/store/player/selectors';
import useTableContext from '../ui/Table/useTableContext';

type Props = { episodeId: number };
const PlayerCell: FC<Props> = ({ episodeId }) => {
  const dispatch = useAppDispatch();
  const playing = useAppSelector(({ player }) => selectPlayingEpisodeId(player) === episodeId);
  const episodes = useTableContext<Episode>();

  const onClick = () => {
    dispatch(playPause({ episodes, selectedId: episodeId }));
  };

  return <PlayButton playing={playing} onClick={onClick} />;
};

export default memo(PlayerCell);
