import { waitFor, screen } from '@testing-library/react';
import { setupStore } from '~/store';
import { render } from '~/test/renderUtils';
import episodesApi from '~/store/episodesApi';
import episodeResults from '~/test/mocks/episode';
import { getServer, createServerHooks } from '~/test/serverUtils';
import { BASEURL } from '~/utils/constants';
import PodcastView from './PodcastView';

const url = `${BASEURL}/`;
const server = getServer([{ url, data: episodeResults }]);

const route = { path: '/podcast/:podcastId', podcastId: '9' }; // id matches mock

const testIds = {
  spinner: 'spinner',
  table: 'table',
  searchInput: 'search-input',
  headerImage: 'header-image',
};

describe('Podcast View', () => {
  const store = setupStore();

  createServerHooks(server, {
    afterEach: () => store.dispatch(episodesApi.util.resetApiState()),
  });

  it('should render header and image initially', () => {
    render(<PodcastView />, store);

    const headerImage = screen.queryByTestId(testIds.headerImage);
    expect(headerImage).toBeInTheDocument();
  });

  it('should render spinner when loading data', async () => {
    render(<PodcastView />, store, { route });

    await waitFor(() => expect(screen.queryByTestId(testIds.spinner)).toBeInTheDocument());
  });

  it('should render data at last', async () => {
    render(<PodcastView />, store, { route });

    await waitFor(() => expect(screen.queryByText('Episode test 1')).toBeInTheDocument());
  });
});
