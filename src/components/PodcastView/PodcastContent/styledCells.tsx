import { Typography } from '@mui/material';
import tw from 'twin.macro';
import { Episode } from '~/entities';

const CellContainer = tw.div`flex items-center gap-5`;
const Img = tw.img`w-[45px] h-[45px] rounded-lg`;
const TitleText = tw(Typography)`text-white`;

export const TextCell = tw(({ children, ...props }) => (
  <Typography variant="body2" {...props}>
    {children}
  </Typography>
))`text-ellipsis line-clamp-3`;

type CellProps = { episode: Episode };
export function TitleCell({ episode }: CellProps) {
  return (
    <CellContainer>
      <Img src={episode.thumbnailUrl} alt={episode.title} />
      <TitleText>{episode.title}</TitleText>
    </CellContainer>
  );
}
