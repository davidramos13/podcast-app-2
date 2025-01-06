import { Fragment, ReactNode } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import usePodcastView from './usePodcastView';
import { SearchBar } from '../ui';
import Spinner from '../ui/Spinner';
import Header from '../ui/Header';
import { BackButton, DivImage } from './PodcastView.styled';
import PodcastContent from './PodcastContent';

const PodcastView = () => {
  const { podcastFull, isLoading, filter, setFilter, goBack } = usePodcastView();

  let mainContent: ReactNode | null = null;

  if (isLoading) {
    mainContent = <Spinner />;
  } else if (podcastFull) {
    mainContent = <PodcastContent podcastFull={podcastFull} filter={filter} />;
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
