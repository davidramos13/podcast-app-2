import tw from 'twin.macro';
import { Column } from '~/components/ui/Table/types';
import { Episode, PodcastFull } from '~/entities';
import { calculateDuration, formatDateToNow } from '~/utils/dates';
import { TextCell, TitleCell } from './styledCells';
import EpisodesPlayerCell from './EpisodesPlayerCell';

const getColumns = (podcast: PodcastFull) => {
  const columns: Column<Episode>[] = [
    {
      name: '#',
      content: episode => <EpisodesPlayerCell podcastFull={podcast} episodeId={episode.id} />,
      sendDataProp: true,
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
  return columns;
};

export default getColumns;
