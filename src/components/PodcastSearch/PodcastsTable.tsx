import { Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { Table } from '~/components/ui';
import { Podcast } from '~/entities';
import { Column } from '../ui/Table';
import PodcastsPlayerCell from './PodcastsPlayerCell';

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

const columns: Column<Podcast>[] = [
  {
    name: '#',
    sortable: false,
    content: (podcast: Podcast) => <PodcastsPlayerCell podcastId={podcast.id} />,
  },
  {
    name: 'Title',
    content: (podcast: Podcast) => <TitleCell podcast={podcast} />,
  },
  { name: 'Genres', content: (podcast: Podcast) => podcast.genres },
  { name: 'Released', content: (podcast: Podcast) => podcast.releaseDate },
  { name: 'Duration', content: (podcast: Podcast) => podcast.duration },
];

type Props = { data: Podcast[] };
const PodcastsTable: FC<Props> = ({ data }) => <Table columns={columns} data={data} />;

export default PodcastsTable;
