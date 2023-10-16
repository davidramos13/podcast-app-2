import { FC } from 'react';
import { Table } from '~/components/ui';
import { Column } from '~/components/ui/Table/types';
import { Podcast } from '~/entities';
import { useAppDispatch } from '~/store';
import { cleanList } from '~/store/player/slice';
import { formatDateToNow } from '~/utils/dates';
import PodcastsPlayerCell from './PodcastsPlayerCell';
import TitleCell from './TitleCell';

const columns: Column<Podcast>[] = [
  {
    name: '#',
    content: podcast => <PodcastsPlayerCell podcastId={podcast.id} />,
  },
  {
    name: 'Name',
    content: podcast => <TitleCell podcast={podcast} />,
    sortableContent: podcast => podcast.name,
  },
  { name: 'Genres', content: podcast => podcast.genres },
  {
    name: 'Released',
    content: podcast => formatDateToNow(podcast.releaseDate),
    sortableContent: podcast => podcast.releaseDate,
    descending: true,
  },
];

type Props = { data: Podcast[] };
const PodcastsTable: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const onSortCallback = () => dispatch(cleanList());

  return <Table columns={columns} data={data} sortedCallback={onSortCallback} />;
};

export default PodcastsTable;
