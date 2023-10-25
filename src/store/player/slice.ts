import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Episode } from '~/entities';
import episodesApi from '../episodesApi';
import changeTrack from './reducers/changeTrack';
import playReducer, { PlayPayload } from './reducers/play';
import { getNextRepeat, PlayerState, Repeat } from './types';

export const initialState: PlayerState = {
  viewPodcast: null,
  playlist: [],
  currentIndex: -1,
  volume: 50,
  currentTime: 0,
  playing: false,
  repeat: Repeat.NO,
  shuffle: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (state, { payload }: PayloadAction<PlayPayload>) => {
      playReducer(state, payload);
    },
    pause: state => {
      state.playing = false;
    },
    stop: state => {
      state.playing = false;
      state.currentTime = 0;
    },
    nextTrack: state => {
      changeTrack(state, true);
    },
    prevTrack: state => {
      changeTrack(state, false);
    },
    setCurrentTime: (state, { payload }: PayloadAction<number>) => {
      state.currentTime = payload;
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
    changeEpisodes: (state, { payload }: PayloadAction<Episode[]>) => {
      if (!state.viewPodcast) return;
      state.viewPodcast.episodes = payload;
    },
    clearPodcast: state => {
      state.viewPodcast = null;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(episodesApi.endpoints.getEpisodes.matchFulfilled, (state, { payload }) => {
      state.viewPodcast = payload;
    });
    // listens request for last episode from podcast, and immediately plays it
    builder.addMatcher(
      episodesApi.endpoints.getLastPodcastEpisode.matchFulfilled,
      (state, { payload }) => {
        if (!payload) return;
        playReducer(state, { podcastFull: payload });
      },
    );
  },
});

export const { play, pause, stop, nextTrack, prevTrack } = playerSlice.actions;
export const { setCurrentTime, setRepeat, setShuffle, setVolume } = playerSlice.actions;
export const { changeEpisodes, clearPodcast } = playerSlice.actions;
export default playerSlice;
