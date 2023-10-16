import { Episode } from '~/entities';

export enum Repeat {
  NO = 'NO',
  ALL = 'ALL',
  ONE = 'ONE',
}

export type PlayerState = {
  episodes: Episode[];
  currentIndex: number;
  volume: number;
  progress: number;
  playing: boolean;
  repeat: Repeat;
  shuffle: boolean;
};
