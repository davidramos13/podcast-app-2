import { Typography } from '@mui/material';
import { FC } from 'react';
import tw from 'twin.macro';
import Table, { Column } from '~/components/ui/Table';
import { Episode } from '~/entities';

const TextCell = tw(({ children, ...props }) => (
  <Typography variant="body2" {...props}>
    {children}
  </Typography>
))`text-ellipsis line-clamp-3`;

const TitleCell = tw(TextCell)`min-w-[150px]`;

const columns: Column<Episode>[] = [
  { name: '#', sortable: false, content: () => '>' },
  {
    name: 'Title',
    content: (episode: Episode) => <TitleCell>{episode.title}</TitleCell>,
  },
  {
    name: 'Topic',
    content: (episode: Episode) => <TextCell>{episode.description}</TextCell>,
    hideSmallDevice: true,
  },
  { name: 'Released', content: (episode: Episode) => episode.releaseDate },
  { name: 'Duration', content: (episode: Episode) => episode.duration },
];

const idSelector = (episode: Episode) => episode.id;

type Props = { data: Episode[] };
const PodcastsTable: FC<Props> = ({ data }) => (
  <Table columns={columns} data={data} idSelector={idSelector} />
);

export default PodcastsTable;
