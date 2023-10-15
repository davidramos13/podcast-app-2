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
  (player: PlayerState) => player.episodes,
  (playing, currentIndex, episodes) => (!playing ? 0 : episodes[currentIndex].id),
);
