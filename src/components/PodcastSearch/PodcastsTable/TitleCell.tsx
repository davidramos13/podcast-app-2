import { Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { Podcast } from '~/entities';

const CellContainer = tw.div`flex items-center gap-5`;
const Img = tw.img`w-[45px] h-[45px] rounded-lg`;
const TextContainer = tw.div`flex flex-col`;
const StyledLink = tw(Link)`text-white no-underline hover:underline decoration-white`;

type CellProps = { podcast: Podcast };
const TitleCell: FC<CellProps> = ({ podcast }) => (
  <CellContainer>
    <Img src={podcast.thumbnailUrl} alt={podcast.name} />
    <TextContainer>
      <StyledLink to={`podcast/${podcast.id}`}>
        <Typography>{podcast.name}</Typography>
      </StyledLink>
      <Typography variant="subtitle2">{podcast.author}</Typography>
    </TextContainer>
  </CellContainer>
);

export default TitleCell;
