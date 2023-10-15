import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Episode } from '~/entities';
import episodesApi from '../episodesApi';
import { PlayerState, Repeat } from './types';

const initialState: PlayerState = {
  episodes: [],
  currentIndex: -1,
  volume: 30,
  progress: 0,
  loading: false,
  playing: false,
  repeat: Repeat.NO,
  shuffle: false,
};

type PlayPayload = { selectedId?: number; episodes?: Episode[] };

const playPauseAction = (state: PlayerState, { selectedId, episodes }: PlayPayload) => {
  if (episodes) {
    state.episodes = episodes;
  }
  if (!state.episodes.length) return;

  if (selectedId) {
    state.currentIndex = state.episodes.findIndex(e => e.id === selectedId);
  }

  if (state.currentIndex !== -1) {
    state.playing = !state.playing;
  }
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playPause: (state, { payload }: PayloadAction<PlayPayload>) => {
      playPauseAction(state, payload);
    },
  },
  extraReducers: builder => {
    // listens request for last episode from podcast, and immediately plays it
    builder.addMatcher(
      episodesApi.endpoints.getLastPodcastEpisode.matchFulfilled,
      (state, { payload: episode }) => {
        const newPayload = { episodes: [episode], selectedId: episode.id };
        playPauseAction(state, newPayload);
      },
    );
  },
});

export const { playPause } = playerSlice.actions;
export default playerSlice;
