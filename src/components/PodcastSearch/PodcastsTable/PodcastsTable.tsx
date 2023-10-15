import { FC } from 'react';
import { Table } from '~/components/ui';
import { Column } from '~/components/ui/Table';
import { Podcast } from '~/entities';
import PodcastsPlayerCell from './PodcastsPlayerCell';
import TitleCell from './TitleCell';

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
