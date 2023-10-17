import { screen, waitFor, fireEvent } from '@testing-library/react';
import { createServerHooks, getServer } from '~/test/serverUtils';
import { render } from '~/test/renderUtils';
import PodcastSearch from './PodcastSearch';
import { BASEURL } from '~/utils/constants';
import { podcastResults } from '~/test/mocks/podcasts';
import { setupStore } from '~/store';
import podcastsApi from '~/store/podcastsApi';

const url = `${BASEURL}/`;
const server = getServer([{ url, data: podcastResults }]);

const testIds = {
  spinner: 'spinner',
  table: 'table',
  searchInput: 'search-input',
};

describe('Podcast Search', () => {
  const store = setupStore();

  createServerHooks(server, {
    afterEach: () => store.dispatch(podcastsApi.util.resetApiState()),
  });

  it('should only render search bar on start', () => {
    render(<PodcastSearch />, store);

    const search = screen.queryByTestId(testIds.searchInput);
    const spinner = screen.queryByTestId(testIds.spinner);
    const table = screen.queryByTestId(testIds.table);

    expect(search).toBeInTheDocument();
    expect(spinner).not.toBeInTheDocument();
    expect(table).not.toBeInTheDocument();
  });

  it('should render table after writing "test" on input', async () => {
    render(<PodcastSearch />, store);

    const input = screen.getByTestId(testIds.searchInput) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => expect(screen.queryByText('Track test 1')).toBeInTheDocument());
  });
});
