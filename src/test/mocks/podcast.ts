import { PodcastApi } from '~/entities/podcast';

const mockData = [
  [1, 'Podcast 1', 'Artist 1', 'Summary 1'],
  [2, 'Podcast 2', 'Artist 2', 'Summary 2'],
  [3, 'Podcast 3', 'Artist 3', 'Summary 3'],
] as [number, string, string, string][];

export const podcastApi: PodcastApi = {
  feed: {
    entry: mockData.map(([id, name, artist, summary]) => ({
      id: { attributes: { 'im:id': id.toString() } },
      'im:name': { label: name },
      'im:artist': { label: artist },
      'im:image': [1, 2, 3].map(() => ({ label: 'https://picsum.photos/100/100' })),
      summary: { label: summary },
    })),
  },
};
