import { createSelector } from '@reduxjs/toolkit';
import { PlayerState } from './types';

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

export const selectPlayItem = createSelector(
  (player: PlayerState) => player.currentIndex,
  (player: PlayerState) => player.playlist,
  (currentIndex, playlist) => playlist[currentIndex],
);
