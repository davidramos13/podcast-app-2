import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupStore } from '~/store';
import { render } from '~/test/renderUtils';
import Player from '.';
import { AudioMiddleware } from '~/store/player/audioMiddleware';
import { getState, withTrackIds } from '~/test/mocks/player';

vi.mock('~/store/player/audioMiddleware', () => {
  const mockMiddleware: AudioMiddleware = () => next => action => next(action);
  return { default: mockMiddleware };
});

const testIds = {
  prevTrackBtn: 'prev-track-btn',
  nextTrackBtn: 'next-track-btn',
  progressBar: 'progress-bar',
};

describe('Player', () => {
  it('should render Player component', () => {
    const store = setupStore(getState(withTrackIds(7)));
    render(<Player />, store);

    const title = screen.queryByText('Track 7'); // from mockTrack
    expect(title).toBeInTheDocument();
  });

  it('should not render if no track loaded', () => {
    const store = setupStore(getState({}));
    render(<Player />, store);

    const title = screen.queryByText('Track 7');
    expect(title).not.toBeInTheDocument();
  });

  it('should move forward and backward', async () => {
    const store = setupStore(getState({ ...withTrackIds(11, 12, 13, 14), currentIndex: 1 })); // Track ID 12 is selected first
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
