import { PodcastFull, Track } from '~/entities';

export enum Repeat {
  NO = 'NO',
  ALL = 'ALL',
  ONE = 'ONE',
}

export type PlayPayload = { episodeId?: number; podcastFull?: PodcastFull };

export type PlayerState = {
  playlist: Track[];
  currentIndex: number;
  volume: number;
  currentTime: number;
  playing: boolean;
  repeat: Repeat;
  shuffle: boolean;
};

export type PlayerActions = {
  play(payload?: PlayPayload): void;
  pause(): void;
  stop(): void;
  nextTrack(): void;
  prevTrack(): void;
  setCurrentTime(time: number): void;
  setRepeat(): void;
  setShuffle(): void;
  setVolume(volume: number): void;
};

export type PlayerSlice = PlayerState & PlayerActions;
