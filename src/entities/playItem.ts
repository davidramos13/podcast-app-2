import { Episode } from './episode';

export type PlayItem = {
  episodeId: number;
  url: string;
  title: string;
  imageUrl: string;
  duration: number;
};

export const mapPlayItem = (episode: Episode) => ({
  episodeId: episode.id,
  url: episode.url,
  title: episode.title,
  imageUrl: episode.imageUrl,
  duration: episode.duration,
});

export const createPlayList = (episodes: Episode[]) => episodes.map(mapPlayItem);
