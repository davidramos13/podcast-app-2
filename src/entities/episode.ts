import { Podcast } from './podcast';
import { EntityWithID } from './shared';

export type Episode = EntityWithID & {
  title: string;
  releaseDate: string;
  description: string;
  duration?: number;
  url: string;
  thumbnailUrl: string;
  imageUrl: string;
};

export type EpisodeGroup = {
  podcast: Podcast;
  episodes: Episode[];
};
