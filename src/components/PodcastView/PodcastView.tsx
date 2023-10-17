import { Fragment, ReactNode } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useNavigate, useParams } from 'react-router-dom';
import usePodcastView from './usePodcastView';
import { SearchBar } from '../ui';
import EpisodesTable from './EpisodesTable';
import Spinner from '../ui/Spinner';
import Header from '../ui/Header';
import { createPlayList } from '~/entities/track';
import {
  DivTitleContainer,
  StyledPlayerCell,
  TitleText,
  BackButton,
  DivImage,
} from './PodcastView.styled';

const PodcastView = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();

  const id = parseInt(podcastId!) || 0;
  const { podcast, episodes, isLoading, filter, setFilter } = usePodcastView(id);

  const goBack = () => navigate(-1);

  let mainContent: ReactNode | null = null;

  if (isLoading) {
    mainContent = <Spinner />;
  } else if (podcast && episodes?.length) {
    const playlist = createPlayList(episodes);
    mainContent = (
      <Fragment>
        <DivTitleContainer>
          <StyledPlayerCell playlist={playlist} episodeId={playlist[0].episodeId} />
          <TitleText>{podcast.name}</TitleText>
        </DivTitleContainer>
        <EpisodesTable data={episodes} />
      </Fragment>
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
