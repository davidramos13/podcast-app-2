import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayItem } from '~/entities';
import { mapPlayItem } from '~/entities/playItem';
import episodesApi from '../episodesApi';
import { PlayerState, Repeat } from './types';

const initialState: PlayerState = {
  playlist: [],
  currentIndex: -1,
  volume: 30,
  progress: 0,
  playing: false,
  repeat: Repeat.NO,
  shuffle: false,
};

type PlayPayload = { selectedId: number; playlist: PlayItem[] };

const loadList = (state: PlayerState, { selectedId, playlist }: PlayPayload) => {
  state.playlist = playlist;
  state.currentIndex = playlist.findIndex(x => x.episodeId === selectedId);
};

// logic for this one explained below the file
const playPauseAction = (state: PlayerState, payload?: PlayPayload) => {
  if (!state.playlist.length) {
    if (!payload) return;
    loadList(state, payload);
    state.playing = true;
    return;
  }

  if (!payload) {
    state.playing = !state.playing;
    return;
  }

  const currentId = state.playlist[state.currentIndex].episodeId;
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
    cleanList: state => {
      // my idea here is that if I am sorting any table, I should remove extra items from playing list
      state.playlist = state.playlist.slice(state.currentIndex, state.currentIndex + 1);
    },
  },
  extraReducers: builder => {
    // listens request for last episode from podcast, and immediately plays it
    builder.addMatcher(
      episodesApi.endpoints.getLastPodcastEpisode.matchFulfilled,
      (state, { payload }) => {
        const { episode } = payload;
        const playItem = mapPlayItem(episode);
        const newPayload = { playlist: [playItem], selectedId: playItem.episodeId };
        playPauseAction(state, newPayload);
      },
    );
  },
});

export const { playPause, cleanList } = playerSlice.actions;
export default playerSlice;

/*
  LOAD = set received values (playlist and index for id)

  logic here:
  - no playlist loaded
      - nothing received => return
      - received payload => LOAD & PLAY
  - playlist loaded
      - nothing received => PLAY/PAUSE
      - received payload
          LOAD (might set state.playlist to the same value, or not)
          - current id === new id => PLAY/PAUSE
          - current id !== new id => PLAY
*/
