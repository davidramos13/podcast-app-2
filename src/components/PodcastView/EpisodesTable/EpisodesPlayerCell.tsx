import { FC, memo } from 'react';
import { PlayerCell } from '~/components/Player';
import { useAppDispatch } from '~/store';
import { play } from '~/store/player/slice';

type Props = { episodeId: number };
const EpisodesPlayerCell: FC<Props> = ({ episodeId, ...props }) => {
  const dispatch = useAppDispatch();

  const onPlay = () => {
    dispatch(play({ episodeId }));
  };

  return <PlayerCell episodeId={episodeId} onPlay={onPlay} {...props} />;
};

export default memo(EpisodesPlayerCell);
