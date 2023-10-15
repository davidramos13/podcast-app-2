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

type PlayPayload = { selectedId: number; episodes: Episode[] };

const loadList = (state: PlayerState, { selectedId, episodes }: PlayPayload) => {
  state.episodes = episodes;
  state.currentIndex = episodes.findIndex(x => x.id === selectedId);
};

// logic for this one explained below the file
const playPauseAction = (state: PlayerState, payload?: PlayPayload) => {
  if (!state.episodes.length) {
    if (!payload) return;
    loadList(state, payload);
    state.playing = true;
    return;
  }

  if (!payload) {
    state.playing = !state.playing;
    return;
  }

  const currentId = state.episodes[state.currentIndex].id;
  loadList(state, payload);
  state.playing = currentId === payload.selectedId ? !state.playing : true;
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playPause: (state, { payload }: PayloadAction<PlayPayload | undefined>) => {
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

/*
  LOAD = set received values (episode list and index for id)

  logic here:
  - no episodes loaded
      - nothing received => return
      - received payload => LOAD & PLAY
  - episodes loaded
      - nothing received => PLAY/PAUSE
      - received payload
          LOAD (might set state.episodes to the same value, or not)
          - current id === new id => PLAY/PAUSE
          - current id !== new id => PLAY
*/
