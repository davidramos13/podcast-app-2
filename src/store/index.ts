import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import episodesApi from './episodesApi';
import audioMiddleware from './player/audioMiddleware';
import playerSlice from './player/slice';
import podcastsApi from './podcastsApi';
import podcastSearchSlice from './podcastSearchSlice';

const rootReducer = combineReducers({
  podcasts: podcastsApi.reducer,
  episodes: episodesApi.reducer,
  player: playerSlice.reducer,
  podcastSearch: podcastSearchSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = <T extends object>(preloadedState?: PreloadedState<T>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: gdm =>
      gdm().prepend(audioMiddleware).concat(podcastsApi.middleware).concat(episodesApi.middleware),
  });

  return store;
};

export type StoreType = ReturnType<typeof setupStore>;
export type AppDispatch = StoreType['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
