import { Track } from '~/entities';
import { ITunesResults } from '~/utils/itunes';

const mockData = [
  [1, '2023-08-15', 3200000],
  [2, '2023-03-09', 4000000],
  [3, '2023-09-24', 3600000],
] as [number, string, number][];

export const mockTrack: Track = {
  episodeId: 7,
  duration: 4400000,
  title: 'Track test 7',
  url: '',
  imageUrl: '',
};

export const mockTrackList: Track[] = (
  [
    [11, 15000],
    [12, 20000],
    [13, 30000],
    [14, 30000],
  ] as [number, number][]
).map(([id, duration]) => ({
  episodeId: id,
  duration: duration,
  title: `Track ${id}`,
  url: '',
  imageUrl: '',
}));

const episodeResults: ITunesResults = {
  results: mockData.map(([id, releaseDate, duration]) => ({
    kind: 'podcast-episode',
    trackId: id,
    trackName: `Episode test ${id}`,
    releaseDate: releaseDate,
    description: `Description ${id}`,
    trackTimeMillis: duration,
    url: '',
    thumbnailUrl: '',
    imageUrl: '',
    genres: [],
    episodeUrl: '',
    artworkUrl60: '',
    artworkUrl160: '',
    artistName: '',
  })),
};

episodeResults.results = [
  {
    kind: 'podcast',
    trackId: 9,
    trackName: 'Podcast 9',
    artistName: 'Test Artist',
    releaseDate: '2023-06-01',
    description: '',
    genres: [],
    episodeUrl: '',
    artworkUrl60: '',
    artworkUrl160: '',
    trackTimeMillis: 0,
  },
  ...episodeResults.results,
];

export default episodeResults;
