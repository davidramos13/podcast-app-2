import { Typography } from '@mui/material';
import { FC, memo } from 'react';
import tw from 'twin.macro';
import { PlayerCell } from '~/components/Player';
import useTableContext from '~/components/ui/Table/useTableContext';
import { Episode } from '~/entities';

export const TextCell = tw(({ children, ...props }) => (
  <Typography variant="body2" {...props}>
    {children}
  </Typography>
))`text-ellipsis line-clamp-3`;

export const TitleCell = tw(TextCell)`min-w-[150px]`;

type Props = { episodeId: number };
const EpisodePlayerCellBase: FC<Props> = ({ episodeId }) => {
  const episodes = useTableContext<Episode>();
  return <PlayerCell episodes={episodes} episodeId={episodeId} />;
};

export const EpisodePlayerCell = memo(EpisodePlayerCellBase);
