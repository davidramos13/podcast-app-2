import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PodcastView = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();

  const id = parseInt(podcastId!) || 0;
  const goBack = () => navigate(-1);

  return (
    <Fragment>
      Podcast ID: {id}
      <button onClick={goBack}>Return to Home</button>
    </Fragment>
  );
};

export default PodcastView;
