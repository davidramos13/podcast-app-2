export type ItunesError = {
  errorMessage: string;
};

type ITunesResult = {
  kind: string;
  trackId: number;
  trackName: string;
  artistName: string;
  releaseDate: string;
  trackTimeMillis?: number;
  description: string;
  episodeUrl: string;
  genres: string[];
};

export type ITunesResults = {
  results: ITunesResult[];
};

export type ITunesResultsRaw = {
  contents: string;
};

export const transformITunesResults = (results: ITunesResultsRaw) => {
  if (!results?.contents) {
    throw new Error('Not found!');
  }
  const data = JSON.parse(results.contents) as ITunesResults | ItunesError;
  if ('errorMessage' in data) {
    throw new Error(data.errorMessage);
  }

  return data.results;
};
