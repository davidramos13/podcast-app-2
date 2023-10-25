import { screen, fireEvent } from '@testing-library/react';
import { setupStore } from '~/store';
import { render } from '~/test/renderUtils';
import { withTrackIds } from '~/test/mocks/player';
import { initialState as playerState } from '~/store/player/slice';
import { PlayerState } from '~/store/player/types';
import Volume from './Volume';
import { mockAudioMiddleware } from '~/test/mocks/audioMiddleware';

mockAudioMiddleware();

type SliderMockProps = {
  onChange: (_: object, newValue: number | number[]) => void;
  value: number;
};

vi.mock('@mui/material', () => {
  const Slider = ({ onChange, value }: SliderMockProps) => (
    <input
      onChange={e => onChange({}, parseInt(e.currentTarget.value))}
      value={value}
      data-testid="volume-bar-mock"
    />
  );
  return { Slider };
});

const testIds = {
  volumeBar: 'volume-bar-mock',
};

const getState = (playerParams: Partial<PlayerState>) => ({
  player: { ...playerState, ...playerParams },
  podcastSearch: {
    currentPodcast: { author: 'Random author' },
  },
});

describe('Volume', () => {
  it('should change volume from slider', () => {
    // initial volume is at 50
    const store = setupStore(getState(withTrackIds(7)));
    render(<Volume />, store);

    const bar = screen.getByTestId(testIds.volumeBar);
    fireEvent.change(bar, { target: { value: '30' } });

    screen.debug();
    expect(store.getState().player.volume).toBe(30);
  });
});
