import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import episodesApi from './episodesApi';
import podcastsApi from './podcastsApi';

const rootReducer = combineReducers({
  [podcastsApi.reducerPath]: podcastsApi.reducer,
  [episodesApi.reducerPath]: episodesApi.reducer,
});

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: gdm => gdm().concat(podcastsApi.middleware).concat(episodesApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
};

type StoreType = ReturnType<typeof setupStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
