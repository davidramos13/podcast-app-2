import { Episode } from '.';
import { EntityWithID } from './shared';

export type Podcast = EntityWithID & {
  name: string;
  author: string;
  genres: string;
  releaseDate: string;
  thumbnailUrl: string;
};

export type PodcastFull = Podcast & {
  episodes: Episode[];
};
