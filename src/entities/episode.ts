import { ItunesError } from './common';

export type Episode = {
  id: number;
  title: string;
  date: string;
  description: string;
  duration: string;
  url: string;
};

export type EpisodesApiRaw = {
  contents: string;
};

export type EpisodesApi = {
  results: {
    kind: string;
    trackId: number;
    trackName: string;
    releaseDate: string;
    trackTimeMillis?: number;
    description: string;
    episodeUrl: string;
  }[];
};

const convertDuration = (ms?: number) => {
  if (!ms) return '';
  const totalSeconds = ms / 1000;
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((totalSeconds / 60) % 60)
    .toString()
    .padStart(2, '0');
  const time = `${minutes}:${seconds}`;
  return time;
};

export const transformEpisodes = (apiData: EpisodesApiRaw): Episode[] => {
  if (!apiData?.contents) {
    throw new Error('Not found!');
  }
  const data = JSON.parse(apiData.contents) as EpisodesApi | ItunesError;
  if ('errorMessage' in data) {
    throw new Error(data.errorMessage);
  }
  return data.results
    .filter(entry => entry.kind === 'podcast-episode')
    .map(entry => ({
      id: entry.trackId,
      title: entry.trackName,
      date: new Date(entry.releaseDate).toLocaleDateString(),
      description: entry.description,
      duration: convertDuration(entry.trackTimeMillis),
      url: entry.episodeUrl,
    }));
};
