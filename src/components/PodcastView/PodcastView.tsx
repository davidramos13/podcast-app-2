import { Fragment } from 'react';
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

const BackButton = tw(IconButton)`bg-bgGray rounded-[15px]`;
const DivImage = tw.div`w-full h-[280px] mt-[22px] bg-podcast bg-cover bg-no-repeat bg-center rounded-[15px]`;
const DivTitleContainer = tw.div`grid grid-cols-podcastView`;
const TitleText = tw(Typography)`text-2xl text-center text-white font-bold`;
const StyledPlayerCell = tw(PlayerCell)`h-[60px] w-[60px]`;

const PodcastView = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();

  const id = parseInt(podcastId!) || 0;
  const { data, isLoading, filter, setFilter } = usePodcastView(id);

  const goBack = () => navigate(-1);

  return (
    <Fragment>
      <Header>
        <BackButton onClick={goBack}>
          <ChevronLeftRoundedIcon fontSize="large" />
        </BackButton>
        <SearchBar filter={filter} setFilter={setFilter} />
      </Header>
      <DivImage />
      {isLoading ? (
        <Spinner />
      ) : (
        data &&
        data.length && (
          <Fragment>
            <DivTitleContainer>
              <StyledPlayerCell episodes={data} episodeId={data[0].id} />
              <TitleText>{data[0].collectionName}</TitleText>
            </DivTitleContainer>
            <EpisodesTable data={data} />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default PodcastView;
