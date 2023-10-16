import { Typography } from '@mui/material';
import { FC, memo } from 'react';
import tw from 'twin.macro';
import { PlayerCell } from '~/components/Player';
import useTableContext from '~/components/ui/Table/useTableContext';
import { Episode } from '~/entities';
import { createPlayList } from '~/entities/playItem';

const CellContainer = tw.div`flex items-center gap-5`;
const Img = tw.img`w-[45px] h-[45px] rounded-lg`;
const TitleText = tw(Typography)`text-white lg:min-w-[250px]`;

export const TextCell = tw(({ children, ...props }) => (
  <Typography variant="body2" {...props}>
    {children}
  </Typography>
))`text-ellipsis line-clamp-3`;

type CellProps = { episode: Episode };
export const TitleCell: FC<CellProps> = ({ episode }) => (
  <CellContainer>
    <Img src={episode.thumbnailUrl} alt={episode.title} />
    <TitleText>{episode.title}</TitleText>
  </CellContainer>
);

type Props = { episodeId: number };
const EpisodePlayerCellBase: FC<Props> = ({ episodeId }) => {
  const episodes = useTableContext<Episode>();
  const playlist = createPlayList(episodes);
  return <PlayerCell playlist={playlist} episodeId={episodeId} />;
};

export const EpisodePlayerCell = memo(EpisodePlayerCellBase);
