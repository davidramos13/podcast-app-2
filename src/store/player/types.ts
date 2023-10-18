import { Track } from '~/entities';
import { PodcastFull } from '~/entities/podcast';

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
  viewPodcast: PodcastFull | null;
  playlist: Track[];
  currentIndex: number;
  volume: number;
  currentTime: number;
  playing: boolean;
  repeat: Repeat;
  shuffle: boolean;
};
