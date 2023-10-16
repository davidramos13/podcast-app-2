import { Fragment, ReactNode } from 'react';
import { IconButton, Typography } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';
import usePodcastView from './usePodcastView';
import { SearchBar } from '../ui';
import EpisodesTable from './EpisodesTable';
import Spinner from '../ui/Spinner';
import Header from '../ui/Header';
import { PlayerCell } from '../Player';
import { createPlayList } from '~/entities/playItem';

const BackButton = tw(IconButton)`bg-bgGray rounded-[15px]`;
const DivImage = tw.div`w-full h-[280px] mt-[22px] bg-podcast bg-cover bg-no-repeat bg-center rounded-[15px]`;
const DivTitleContainer = tw.div`grid grid-cols-podcastView gap-2 lg:-mb-16 lg:gap-24`;
const TitleText = tw(Typography)`text-[32px] text-center text-white font-bold`;
const StyledPlayerCell = tw(PlayerCell)`h-[60px] w-[60px]`;

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
      <DivImage />
      {mainContent}
    </Fragment>
  );
};

export default PodcastView;
