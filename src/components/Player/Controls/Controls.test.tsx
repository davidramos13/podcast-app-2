import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupStore } from '~/store';
import { render } from '~/test/renderUtils';
import { AudioMiddleware } from '~/store/player/audioMiddleware';
import { getState, withTrackIds } from '~/test/mocks/player';
import Controls from './Controls';

vi.mock('~/store/player/audioMiddleware', () => {
  const mockMiddleware: AudioMiddleware = () => next => action => next(action);
  return { default: mockMiddleware };
});

const testIds = {
  playPauseButton: 'play-pause-button',
  playIcon: 'play-icon',
  pauseIcon: 'pause-icon',
  shuffleBtn: 'shuffle-btn',
  shuffleOn: 'shuffle-on',
  shuffleOff: 'shuffle-off',
  repeatBtn: 'repeat-btn',
  repeatNo: 'repeat-no',
  repeatAll: 'repeat-all',
  repeatOne: 'repeat-one',
};

describe('Player Controls', () => {
  it('should toggle Play Pause', async () => {
    const store = setupStore(getState(withTrackIds(7)));
    render(<Controls />, store);

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

  it.only('should toggle Shuffle on/off', async () => {
    const store = setupStore(getState(withTrackIds(11, 12, 13)));
    render(<Controls />, store);

    const on1 = screen.queryByTestId(testIds.shuffleOn);
    const off1 = screen.queryByTestId(testIds.shuffleOff);
    expect(on1).not.toBeInTheDocument();
    expect(off1).toBeInTheDocument();

    const shuffleBtn = screen.getByTestId(testIds.shuffleBtn);
    await userEvent.click(shuffleBtn);

    const on2 = screen.queryByTestId(testIds.shuffleOn);
    const off2 = screen.queryByTestId(testIds.shuffleOff);
    expect(on2).toBeInTheDocument();
    expect(off2).not.toBeInTheDocument();

    await userEvent.click(shuffleBtn);

    const on3 = screen.queryByTestId(testIds.shuffleOn);
    const off3 = screen.queryByTestId(testIds.shuffleOff);
    expect(on3).not.toBeInTheDocument();
    expect(off3).toBeInTheDocument();
  });

  it('should toggle Repeat all/one/no', async () => {
    const store = setupStore(getState(withTrackIds(11, 12, 13)));
    render(<Controls />, store);

    const no1 = screen.queryByTestId(testIds.repeatNo);
    const all1 = screen.queryByTestId(testIds.repeatAll);
    const one1 = screen.queryByTestId(testIds.repeatOne);
    expect(no1).toBeInTheDocument();
    expect(all1).not.toBeInTheDocument();
    expect(one1).not.toBeInTheDocument();

    const repeatBtn = screen.getByTestId(testIds.repeatBtn);
    await userEvent.click(repeatBtn);

    const no2 = screen.queryByTestId(testIds.repeatNo);
    const all2 = screen.queryByTestId(testIds.repeatAll);
    const one2 = screen.queryByTestId(testIds.repeatOne);
    expect(no2).not.toBeInTheDocument();
    expect(all2).toBeInTheDocument();
    expect(one2).not.toBeInTheDocument();

    await userEvent.click(repeatBtn);

    const no3 = screen.queryByTestId(testIds.repeatNo);
    const all3 = screen.queryByTestId(testIds.repeatAll);
    const one3 = screen.queryByTestId(testIds.repeatOne);
    expect(no3).not.toBeInTheDocument();
    expect(all3).not.toBeInTheDocument();
    expect(one3).toBeInTheDocument();

    await userEvent.click(repeatBtn);

    const no4 = screen.queryByTestId(testIds.repeatNo);
    const all4 = screen.queryByTestId(testIds.repeatAll);
    const one4 = screen.queryByTestId(testIds.repeatOne);
    expect(no4).toBeInTheDocument();
    expect(all4).not.toBeInTheDocument();
    expect(one4).not.toBeInTheDocument();
  });
});
