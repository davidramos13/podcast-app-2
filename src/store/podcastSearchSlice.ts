import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Podcast } from '~/entities';
import episodesApi from './episodesApi';

type PodcastSearchState = { filter: string; currentPodcast: Podcast | null };

const initialState: PodcastSearchState = { filter: '', currentPodcast: null };

const podcastSearchSlice = createSlice({
  name: 'podcastSearch',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<string>) => {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      episodesApi.endpoints.getLastPodcastEpisode.matchFulfilled,
      (state, { payload }) => {
        state.currentPodcast = payload.podcast;
      },
    );
    builder.addMatcher(episodesApi.endpoints.getEpisodes.matchFulfilled, (state, { payload }) => {
      state.currentPodcast = payload.podcast;
    });
  },
});

export const { setFilter } = podcastSearchSlice.actions;
export default podcastSearchSlice;
