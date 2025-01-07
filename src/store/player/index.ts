import { StateCreatorFull } from '../types';
import actions from './actions';
import { initial } from './state';
import { PlayerSlice } from './types';

export const createPlayerSlice: StateCreatorFull<PlayerSlice> = (set, get) => ({
  ...initial,
  ...actions(set, get),
});
