import { Episode, PodcastFull } from '~/entities';
import {
  DivTitleContainer,
  MainContainer,
  StyledPlayerCell,
  TitleText,
} from '../PodcastView.styled';
import { useState } from 'react';
import { Table } from '~/components/ui';
import getColumns from './getColumns';

type Props = {
  podcastFull: PodcastFull;
  filter: string;
};

function PodcastContent({ podcastFull, filter }: Props) {
  const [podcast, setPodcast] = useState(podcastFull);

  const filterValue = filter.toLowerCase();
  const episodes = podcast.episodes.filter(x => x.title.toLowerCase().includes(filterValue));

  const columns = getColumns(podcast);

  const onSortCallback = (data: Episode[]) => {
    setPodcast({ ...podcast, episodes: data });
  };

  return (
    <MainContainer>
      <DivTitleContainer>
        <StyledPlayerCell podcastFull={podcast} episodeId={podcast.episodes[0].id} />
        <TitleText>{podcast.name}</TitleText>
      </DivTitleContainer>
      <Table columns={columns} data={episodes} sortedCallback={onSortCallback} />
    </MainContainer>
  );
}

export default PodcastContent;
