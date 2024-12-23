import { StateCreator } from 'zustand';
import actions from './actions';
import { initial } from './state';
import { PlayerSlice } from './types';

export const createPlayerSlice: StateCreator<PlayerSlice> = (set, get) => ({
  ...initial,
  ...actions(set, get),
});
