import { EntityWithID } from './shared';

export type Episode = EntityWithID & {
  collectionName: string;
  artistName: string;
  title: string;
  releaseDate: string;
  description: string;
  duration?: number;
  url: string;
  thumbnailUrl: string;
  imageUrl: string;
};
