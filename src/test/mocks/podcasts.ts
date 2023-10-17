import { ITunesResults } from '~/utils/itunes';

const mockData = [
  [1, '2023-08-15'],
  [2, '2023-03-09'],
  [3, '2023-09-24'],
] as [number, string][];

export const podcastResults: ITunesResults = {
  results: mockData.map(([id, releaseDate]) => ({
    kind: 'podcast',
    trackId: id,
    trackName: `Track test ${id}`,
    artistName: `Artist ${id}`,
    genres: [],
    releaseDate: releaseDate,
    thumbnailUrl: '',
    trackTimeMillis: 0,
    description: '',
    episodeUrl: '',
    artworkUrl60: '',
    artworkUrl160: '',
  })),
};
