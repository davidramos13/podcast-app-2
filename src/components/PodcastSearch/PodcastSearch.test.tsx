import { getServer, render } from '~/test/testUtils';
import PodcastSearch from './PodcastSearch';

const server = getServer([{ url: '', data: null }]);

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
