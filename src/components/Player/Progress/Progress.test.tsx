import { screen } from '@testing-library/react';
import { setupStore } from '~/store';
import { render } from '~/test/renderUtils';
import { getState, withOneTrack, withTrackIds } from '~/test/mocks/player';
import Progress from './Progress';

const testIds = {
  progressBar: 'progress-bar',
};

describe('Player Progress', () => {
  it('should display expected Progress values', () => {
    // currentTime 1200 secs = 20 min. total time 4800 secs = 80 min. progress = 25%
    const store = setupStore(getState({ ...withTrackIds(7), currentTime: 1200 }));
    render(<Progress />, store);

    const startTime = screen.queryByText('20:00');
    const bar = screen.getByTestId(testIds.progressBar);
    const endTime = screen.queryByText('01:20:00');

    expect(startTime).toBeInTheDocument();
    expect(endTime).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuenow', '25');
  });

  it('should display expected Progress values for no duration', () => {
    // currentTime 1200 secs = 20 min. total time 4800 secs = 80 min. progress = 25%
    const store = setupStore(getState({ ...withOneTrack(7, 0) }));
    render(<Progress />, store);

    const bothTimes = screen.queryAllByText('00:00');
    const bar = screen.getByTestId(testIds.progressBar);

    expect(bothTimes).toHaveLength(2);
    expect(bar).toHaveAttribute('aria-valuenow', '0');
  });
});
