import { Episode } from '.';
import { PodcastFull } from './podcast';

export type Track = {
  episodeId: number;
  author: string;
  url: string;
  title: string;
  imageUrl: string;
  duration: number;
};

export const mapTrack = (episode: Episode, author: string) => ({
  episodeId: episode.id,
  author: author,
  url: episode.url,
  title: episode.title,
  imageUrl: episode.imageUrl,
  duration: episode.duration,
});

export const createPlayList = (podcastFull: PodcastFull) =>
  podcastFull.episodes.map(e => mapTrack(e, podcastFull.author));
