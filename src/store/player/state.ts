import { PlayerState, Repeat } from './types';

export const initial: PlayerState = {
  viewPodcast: null,
  playlist: [],
  currentIndex: -1,
  volume: 50,
  currentTime: 0,
  playing: false,
  repeat: Repeat.NO,
  shuffle: false,
};