import { FC } from 'react';
import tw from 'twin.macro';
import Table from '~/components/ui/Table';
import { Column } from '~/components/ui/Table/types';
import { Episode } from '~/entities';
import { calculateDuration, formatDateToNow } from '~/utils/dates';
import { TextCell, TitleCell } from './styledCells';
import EpisodesPlayerCell from './EpisodesPlayerCell';

const columns: Column<Episode>[] = [
  {
    name: '#',
    content: episode => <EpisodesPlayerCell episodeId={episode.id} />,
  },
  {
    name: 'Title',
    content: episode => <TitleCell episode={episode} />,
    sortableContent: episode => episode.title,
    cellCss: tw`lg:w-72`,
  },
  {
    name: 'Topic',
    content: episode => <TextCell>{episode.description}</TextCell>,
    sortableContent: episode => episode.description,
    hideSmallDevice: true,
  },
  {
    name: 'Released',
    content: episode => formatDateToNow(episode.releaseDate),
    sortableContent: episode => episode.releaseDate,
    descending: true,
  },
  {
    name: 'Duration',
    content: episode => calculateDuration(episode.duration),
    sortableContent: episode => episode.duration || 0,
    descending: true,
  },
];

type Props = { data: Episode[] };
const EpisodesTable: FC<Props> = ({ data }) => {
  // const { changeEpisodes } = useAppStore(({ changeEpisodes }) => ({ changeEpisodes }));
  const onSortCallback = (data: Episode[]) => {
    console.log(data);
    debugger;
  }; // changeEpisodes(data);

  return <Table columns={columns} data={data} sortedCallback={onSortCallback} />;
};

export default EpisodesTable;
