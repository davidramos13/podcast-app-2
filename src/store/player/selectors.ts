import { createSelector } from '@reduxjs/toolkit';
import { PlayerState } from './types';

export const selectPlayerBarData = createSelector(
  (player: PlayerState) => player.currentIndex,
  (player: PlayerState) => player.playing,
  (currentIndex, playing) => ({
    visible: currentIndex !== -1,
    playing: playing,
  }),
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
