import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GetState, StoreState } from './types';
import { PlayerSlice } from './player/types';
import { createPlayerSlice } from './player';
import createSearchSlice from './createSearchSlice';
import audio from './player/AudioControl';
import { selectTrack } from './player/selectors';

const initParams = (get: GetState<PlayerSlice>) => {
  const slice = get();
  const { setCurrentTime: setTime, stop, nextTrack, volume } = slice;
  const getTrack = () => selectTrack(slice);
  return { setTime, stop, nextTrack, volume, getTrack };
};

export const useStore = create<StoreState>()(
  devtools((set, get, api) => {
    audio.init(initParams(get));
    return {
      ...createPlayerSlice(set, get, api),
      ...createSearchSlice(set, get, api),
    };
  }),
);
