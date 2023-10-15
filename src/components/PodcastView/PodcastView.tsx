import { Fragment } from 'react';
import { CircularProgress, IconButton } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';
import usePodcastView from './usePodcastView';
import { SearchBar } from '../ui';
import EpisodesTable from './EpisodesTable';

const DivContainer = tw.div`flex gap-[15px]`;

const PodcastView = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();

  const id = parseInt(podcastId!) || 0;
  const { data, isLoading, filter, setFilter } = usePodcastView(id);

  const goBack = () => navigate(-1);

  return (
    <Fragment>
      <DivContainer>
        <IconButton onClick={goBack}>
          <ChevronLeftRoundedIcon />
        </IconButton>
        <SearchBar filter={filter} setFilter={setFilter} />
      </DivContainer>
      {isLoading ? <CircularProgress /> : data && <EpisodesTable data={data} />}
    </Fragment>
  );
};

export default PodcastView;
