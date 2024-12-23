import { StateCreator } from 'zustand';

export type SearchSlice = {
  filter: string;
  setFilter(value: string): void;
};

const createSearchSlice: StateCreator<SearchSlice> = set => ({
  filter: '',
  setFilter: (value: string) => set({ filter: value }),
});

export default createSearchSlice;
