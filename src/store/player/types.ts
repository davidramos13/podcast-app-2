import { Track } from '~/entities';

export enum Repeat {
  NO = 'NO',
  ALL = 'ALL',
  ONE = 'ONE',
}

const repeatOrder = [Repeat.NO, Repeat.ALL, Repeat.ONE];
export const getNextRepeat = (current: Repeat) => {
  const index = repeatOrder.findIndex(x => x === current);
  return index === 2 ? repeatOrder[0] : repeatOrder[index + 1];
};

export type PlayerState = {
  playlist: Track[];
  currentIndex: number;
  volume: number;
  progress: number;
  playing: boolean;
  repeat: Repeat;
  shuffle: boolean;
};
