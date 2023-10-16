import { createSelector } from '@reduxjs/toolkit';
import { PlayerState, Repeat } from './types';

export const selectProgress = createSelector(
  (player: PlayerState) => player.progress,
  (player: PlayerState) => player.playlist,
  (player: PlayerState) => player.currentIndex,
  (progress, playlist, currentIndex) => {
    const { duration } = playlist[currentIndex];
    return { progress, duration };
  },
);

export const selectPlayingEpisodeId = createSelector(
  (player: PlayerState) => player.playing,
  (player: PlayerState) => player.currentIndex,
  (player: PlayerState) => player.playlist,
  (playing, currentIndex, playlist) => (!playing ? 0 : playlist[currentIndex].episodeId),
);

export const selectTrack = createSelector(
  (player: PlayerState) => player.currentIndex,
  (player: PlayerState) => player.playlist,
  (currentIndex, playlist) => playlist[currentIndex],
);

export const selectPlayerControlsState = createSelector(
  (player: PlayerState) => player.playing,
  (player: PlayerState) => player.shuffle,
  (player: PlayerState) => player.repeat,
  (player: PlayerState) => player.playlist,
  (player: PlayerState) => player.currentIndex,
  (playing, shuffle, repeat, playlist, currentIndex) => {
    const currentLast = currentIndex === playlist.length - 1;

    const disableShuffle = playlist.length < 2;
    const disableNext = currentLast && repeat === Repeat.NO;
    const disablePrevious = shuffle || (currentIndex === 0 && repeat === Repeat.NO);

    return { playing, shuffle, repeat, disableShuffle, disableNext, disablePrevious };
  },
);
