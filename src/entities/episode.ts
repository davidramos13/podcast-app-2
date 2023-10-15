import { EntityWithID } from './shared';

export type Episode = EntityWithID & {
  title: string;
  releaseDate: string;
  description: string;
  duration: string;
  url: string;
};
