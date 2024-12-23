import { StateCreator, StoreApi } from 'zustand';
import { PlayerSlice } from './player/types';
import { SearchSlice } from './createSearchSlice';

// Generic Types

export type SetState<T> = Parameters<StateCreator<T>>[0];
export type GetState<T> = Parameters<StateCreator<T>>[1];

export type Middleware<T> = (
  config: StateCreator<T>,
) => (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) => T;

// Store Full Type

export type StoreState = PlayerSlice & SearchSlice;
