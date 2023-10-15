import { Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { Podcast } from '~/entities';

const TitleContainer = tw.div`flex flex-col`;

type CellProps = { podcast: Podcast };
const TitleCell: FC<CellProps> = ({ podcast }) => (
  <TitleContainer>
    <Link to={`podcast/${podcast.id}`}>
      <Typography>{podcast.name}</Typography>
    </Link>
    <Typography>{podcast.author}</Typography>
  </TitleContainer>
);

export default TitleCell;
