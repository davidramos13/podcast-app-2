import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mapTrack } from '~/entities/track';
import episodesApi from '../episodesApi';
import changeTrack from './actions/changeTrack';
import playPauseAction, { PlayPayload } from './actions/playPauseAction';
import { getNextRepeat, PlayerState, Repeat } from './types';

const initialState: PlayerState = {
  playlist: [],
  currentIndex: -1,
  volume: 30,
  progress: 58,
  playing: false,
  repeat: Repeat.NO,
  shuffle: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playPause: (state, { payload }: PayloadAction<PlayPayload>) => {
      playPauseAction(state, payload);
    },
    cleanList: state => {
      // my idea here is that if I am sorting any table, I should remove extra items from playing list
      state.playlist = state.playlist.slice(state.currentIndex, state.currentIndex + 1);
    },
    nextTrack: state => {
      changeTrack(state, true);
    },
    prevTrack: state => {
      changeTrack(state, false);
    },
    setProgress: (state, { payload }: PayloadAction<number>) => {
      state.progress = payload;
    },
    setRepeat: state => {
      state.repeat = getNextRepeat(state.repeat);
    },
    setShuffle: state => {
      state.shuffle = !state.shuffle;
    },
    setVolume: (state, { payload }: PayloadAction<number>) => {
      state.volume = payload;
    },
  },
  extraReducers: builder => {
    // listens request for last episode from podcast, and immediately plays it
    builder.addMatcher(
      episodesApi.endpoints.getLastPodcastEpisode.matchFulfilled,
      (state, { payload }) => {
        const track = mapTrack(payload.episode);
        const newPayload = { playlist: [track], selectedId: track.episodeId };
        playPauseAction(state, newPayload);
      },
    );
  },
});

export const { playPause, cleanList, nextTrack, prevTrack } = playerSlice.actions;
export const { setProgress, setRepeat, setShuffle, setVolume } = playerSlice.actions;
export default playerSlice;
