import { Episode } from '.';

export type Podcast = {
  id: number;
  name: string;
  author: string;
  genres: string;
  releaseDate: string;
  thumbnailUrl: string;
};

export type PodcastFull = Podcast & {
  episodes: Episode[];
};
