import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Repeat } from './types';

export const selectProgress = createSelector(
  ({ player }: RootState) => player.currentTime,
  ({ player }: RootState) => player.playlist,
  ({ player }: RootState) => player.currentIndex,
  (currentTime, playlist, currentIndex) => {
    const { duration } = playlist[currentIndex];
    return { currentTime, duration };
  },
);

export const selectTrack = createSelector(
  ({ player }: RootState) => player.currentIndex,
  ({ player }: RootState) => player.playlist,
  (currentIndex, playlist) => playlist[currentIndex],
);

export const selectIsPlayingThisEpisode = createSelector(
  ({ player }: RootState) => player.playing,
  ({ player }: RootState) => player.currentIndex,
  ({ player }: RootState) => player.playlist,
  (_: RootState, episodeId: number) => episodeId,
  (playing, currentIndex, playlist, episodeId) =>
    !playing ? false : playlist[currentIndex].episodeId === episodeId,
);

export const selectPlayerControlsState = createSelector(
  ({ player }: RootState) => player.playing,
  ({ player }: RootState) => player.shuffle,
  ({ player }: RootState) => player.repeat,
  ({ player }: RootState) => player.playlist,
  ({ player }: RootState) => player.currentIndex,
  (playing, shuffle, repeat, playlist, currentIndex) => {
    const currentLast = currentIndex === playlist.length - 1;

    const disableShuffle = playlist.length < 2;
    const disableNext = currentLast && repeat === Repeat.NO;
    const disablePrevious = shuffle || (currentIndex === 0 && repeat === Repeat.NO);

    return { playing, shuffle, repeat, disableShuffle, disableNext, disablePrevious };
  },
);
