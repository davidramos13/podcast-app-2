export type Podcast = {
  id: number;
  name: string;
  author: string;
  logo: string;
  description: string;
};

export type PodcastApi = {
  feed: {
    entry: {
      id: {
        attributes: {
          'im:id': string;
        };
      };
      'im:name': {
        label: string;
      };
      'im:image': {
        label: string;
      }[];
      'im:artist': {
        label: string;
      };
      summary: {
        label: string;
      };
    }[];
  };
};

export const transformPodcasts = (apiData: PodcastApi): Podcast[] => {
  if (!apiData?.feed?.entry) {
    throw new Error('Not found!');
  }
  return apiData.feed.entry.map(entry => ({
    id: parseInt(entry.id.attributes['im:id']),
    name: entry['im:name'].label,
    author: entry['im:artist'].label,
    logo: entry['im:image'][2].label,
    description: entry.summary.label,
  }));
};
