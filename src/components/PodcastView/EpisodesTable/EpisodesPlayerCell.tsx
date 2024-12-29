import { FC, memo } from 'react';
import { PlayerCell } from '~/components/Player';
import { useShallowAppStore } from '~/store';

type Props = { episodeId: number };
const EpisodesPlayerCell: FC<Props> = ({ episodeId, ...props }) => {
  const play = useShallowAppStore(state => state.play);

  const onPlay = () => play({ episodeId });

  return <PlayerCell episodeId={episodeId} onPlay={onPlay} {...props} />;
};

export default memo(EpisodesPlayerCell);
