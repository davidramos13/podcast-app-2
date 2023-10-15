import { FC } from 'react';
import Table, { Column } from '~/components/ui/Table';
import { Episode } from '~/entities';
import { EpisodePlayerCell, TextCell, TitleCell } from './cells';

const columns: Column<Episode>[] = [
  {
    name: '#',
    sortable: false,
    content: (episode: Episode) => <EpisodePlayerCell episodeId={episode.id} />,
  },
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

type Props = { data: Episode[] };
const PodcastsTable: FC<Props> = ({ data }) => <Table columns={columns} data={data} />;

export default PodcastsTable;
