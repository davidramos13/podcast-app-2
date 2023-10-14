import { Routes, Route } from 'react-router';
import { getServer, render } from '~/test/testUtils';
import { getEpisodesUrl } from '~/utils/constants';
import PodcastView from './PodcastView';

const PODCAST_ID = 1;
const server = getServer([{ url: getEpisodesUrl(PODCAST_ID), data: null }]);

const podcastPageJsx = () => (
  <Routes>
    <Route path="podcast/:podcastId" element={<PodcastView />} />
  </Routes>
);

// handlers to intercept endpoint calls done in App component
describe('Podcast View', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    localStorage.clear();
  });

  afterAll(() => {
    server.close();
  });

  it('TEMP: render', () => {
    render(podcastPageJsx(), { route: `/podcast/${PODCAST_ID}` });

    // Assertions pending
  });
});
