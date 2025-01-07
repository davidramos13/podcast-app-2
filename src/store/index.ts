import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { StoreState } from './types';
import { PlayerSlice } from './player/types';
import { createPlayerSlice } from './player';
import createSearchSlice from './createSearchSlice';
import audio from './player/AudioControl';
import { useShallow } from 'zustand/shallow';

const initParams = (slice: PlayerSlice) => {
  const { setCurrentTime: setTime, stop, nextTrack, volume } = slice;
  return { setTime, stop, nextTrack, volume };
};

export const useAppStore = create<StoreState>()(
  devtools((set, get, api) => {
    const store = {
      ...createPlayerSlice(set, get, api),
      ...createSearchSlice(set, get, api),
    };
    audio.init(initParams(store));
    return store;
  }),
);

// type PickState<T, K extends keyof T> = Pick<T, K>;
type PickState = Pick<StoreState, keyof StoreState>;
export function useShallowAppStore<K extends keyof StoreState>(keys: K[]): PickState;
export function useShallowAppStore<T>(selector: (state: StoreState) => T): T;

export function useShallowAppStore<K extends keyof StoreState>(
  arg: K[] | ((state: StoreState) => unknown),
) {
  const selector = Array.isArray(arg)
    ? (state: StoreState) =>
        arg.reduce((acc, key) => ({ ...acc, [key]: state[key] }), {} as PickState)
    : arg;

  return useAppStore(useShallow(selector));
}
