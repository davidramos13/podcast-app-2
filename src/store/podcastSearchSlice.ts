import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PodcastSearchState = { filter: string };

const initialState: PodcastSearchState = { filter: '' };

const podcastSearchSlice = createSlice({
  name: 'podcastSearch',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<string>) => {
      state.filter = payload;
    },
  },
});

export const { setFilter } = podcastSearchSlice.actions;
export default podcastSearchSlice;
