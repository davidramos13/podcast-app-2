import { Fragment, ReactNode } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import usePodcastView from './usePodcastView';
import { SearchBar } from '../ui';
import EpisodesTable from './EpisodesTable';
import Spinner from '../ui/Spinner';
import Header from '../ui/Header';
import {
  DivTitleContainer,
  StyledPlayerCell,
  TitleText,
  BackButton,
  DivImage,
  MainContainer,
} from './PodcastView.styled';

const PodcastView = () => {
  const { podcastFull, isLoading, filter, setFilter, goBack } = usePodcastView();

  let mainContent: ReactNode | null = null;

  if (isLoading) {
    mainContent = <Spinner />;
  } else if (podcastFull) {
    mainContent = (
      <MainContainer>
        <DivTitleContainer>
          <StyledPlayerCell episodeId={podcastFull.episodes[0].id} />
          <TitleText>{podcastFull.name}</TitleText>
        </DivTitleContainer>
        <EpisodesTable data={podcastFull.episodes} />
      </MainContainer>
    );
  }

  return (
    <Fragment>
      <Header>
        <BackButton onClick={goBack}>
          <ChevronLeftRoundedIcon fontSize="large" />
        </BackButton>
        <SearchBar filter={filter} setFilter={setFilter} />
      </Header>
      <DivImage data-testid="header-image" />
      {mainContent}
    </Fragment>
  );
};

export default PodcastView;
