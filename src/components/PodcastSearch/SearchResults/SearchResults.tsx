import { FC } from 'react';
import Table, { Column } from '~/components/ui/Table';
import { Podcast } from '~/entities/podcast';
import { calculateDuration, formatDateToNow } from '~/utils/dates';

const columns: Column<Podcast>[] = [
  { name: '#', sortable: false, content: () => '>' },
  { name: 'Title', content: (podcast: Podcast) => podcast.name },
  { name: 'Genres', content: (podcast: Podcast) => podcast.genres.join(', ') },
  { name: 'Released', content: (podcast: Podcast) => formatDateToNow(podcast.releaseDate) },
  { name: 'Duration', content: (podcast: Podcast) => calculateDuration(podcast.duration) },
];

const idSelector = (podcast: Podcast) => podcast.id;

type Props = { podcasts: Podcast[] };
const SearchResults: FC<Props> = ({ podcasts }) => (
  <Table columns={columns} data={podcasts} idSelector={idSelector} />
);

export default SearchResults;
