import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import episodesApi from './episodesApi';
import audioMiddleware from './player/audioMiddleware';
import playerSlice from './player/slice';
import podcastsApi from './podcastsApi';
import podcastSearchSlice from './podcastSearchSlice';

const rootReducer = combineReducers({
  [podcastsApi.reducerPath]: podcastsApi.reducer,
  [episodesApi.reducerPath]: episodesApi.reducer,
  [playerSlice.name]: playerSlice.reducer,
  [podcastSearchSlice.name]: podcastSearchSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: gdm =>
      gdm().concat(podcastsApi.middleware).concat(episodesApi.middleware).concat(audioMiddleware),
  });

  return store;
};

export type StoreType = ReturnType<typeof setupStore>;
export type AppDispatch = StoreType['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
