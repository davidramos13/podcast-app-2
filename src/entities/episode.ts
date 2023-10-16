import { EntityWithID } from './shared';

export type Episode = EntityWithID & {
  collectionName: string;
  title: string;
  releaseDate: string;
  description: string;
  duration?: number;
  url: string;
};
