import { podcastApi } from '~/test/mocks/podcast';
import { getServer, render } from '~/test/testUtils';
import { PODCASTS_URL } from '~/utils/constants';
import PodcastSearch from './PodcastSearch';

const server = getServer([{ url: PODCASTS_URL, data: podcastApi }]);

describe('Podcast Search', () => {
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
    render(<PodcastSearch />);

    // Assertions pending
  });
});
