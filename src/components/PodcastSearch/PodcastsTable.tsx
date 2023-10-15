import { Typography } from '@mui/material';
import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { Table } from '~/components/ui';
import { Podcast } from '~/entities';
import { Column } from '../ui/Table';

type CellProps = { podcast: Podcast };
const TitleCell: FC<CellProps> = ({ podcast }) => (
  <Fragment>
    <Link to={`podcast/${podcast.id}`}>
      <Typography>{podcast.name}</Typography>
    </Link>
    <Typography>{podcast.author}</Typography>
  </Fragment>
);

const columns: Column<Podcast>[] = [
  { name: '#', sortable: false, content: () => '>' },
  {
    name: 'Title',
    cellCss: tw`flex flex-col`,
    content: (podcast: Podcast) => <TitleCell podcast={podcast} />,
  },
  { name: 'Genres', content: (podcast: Podcast) => podcast.genres },
  { name: 'Released', content: (podcast: Podcast) => podcast.releaseDate },
  { name: 'Duration', content: (podcast: Podcast) => podcast.duration },
];

const idSelector = (podcast: Podcast) => podcast.id;

type Props = { data: Podcast[] };
const PodcastsTable: FC<Props> = ({ data }) => (
  <Table columns={columns} data={data} idSelector={idSelector} />
);

export default PodcastsTable;
