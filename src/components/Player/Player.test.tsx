import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupStore } from '~/store';
import { render } from '~/test/renderUtils';
import { mockTrack, mockTrackList } from '~/test/mocks/episode';
import Player from '.';
import { AudioMiddleware } from '~/store/player/audioMiddleware';

vi.mock('~/store/player/audioMiddleware', () => {
  const mockMiddleware: AudioMiddleware = () => next => action => next(action);
  return { default: mockMiddleware };
});

const testIds = {
  playPauseButton: 'play-pause-button',
  playIcon: 'play-icon',
  pauseIcon: 'pause-icon',
  prevTrackBtn: 'prev-track-btn',
  nextTrackBtn: 'next-track-btn',
};

const baseState = {
  player: {
    playlist: [mockTrack],
    currentIndex: 0,
    playing: false,
    volume: 50,
  },
  podcastSearch: {
    currentPodcast: {
      author: 'Random author',
    },
  },
};

describe('Player', () => {
  it('should render Player component', () => {
    const store = setupStore({ ...baseState });
    render(<Player />, store);

    const title = screen.queryByText('Track test 7'); // from mockTrack
    expect(title).toBeInTheDocument();
  });

  it('should toggle Play Pause', async () => {
    const store = setupStore({ ...baseState });
    render(<Player />, store);

    const icon1 = screen.queryByTestId(testIds.playIcon);
    expect(icon1).toBeInTheDocument();

    const playPauseButton = screen.getByTestId(testIds.playPauseButton);
    await userEvent.click(playPauseButton);

    const icon2 = screen.queryByTestId(testIds.pauseIcon);
    expect(icon2).toBeInTheDocument();
    await userEvent.click(playPauseButton);

    const icon3 = screen.queryByTestId(testIds.playIcon);
    expect(icon3).toBeInTheDocument();
  });

  it('should move forward and backward', async () => {
    const store = setupStore({
      ...baseState,
      player: { playlist: mockTrackList, currentIndex: 1 },
    });
    render(<Player />, store);

    const prevBtn = screen.getByTestId(testIds.prevTrackBtn);
    const nextBtn = screen.getByTestId(testIds.nextTrackBtn);

    // Track 12 => Track 13 => Track 12
    const title = screen.queryByText('Track 12');
    expect(title).toBeInTheDocument();

    await userEvent.click(nextBtn);
    const title2 = screen.queryByText('Track 13');
    expect(title2).toBeInTheDocument();

    await userEvent.click(prevBtn);
    const title3 = screen.queryByText('Track 12');
    expect(title3).toBeInTheDocument();
  });
});
