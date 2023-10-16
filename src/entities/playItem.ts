import { Episode } from './episode';

export type PlayItem = {
  episodeId: number;
  url: string;
  title: string;
  imageUrl: string;
};

export const mapPlayItem = (episode: Episode) => ({
  episodeId: episode.id,
  url: episode.url,
  title: episode.title,
  imageUrl: episode.imageUrl,
});

export const createPlayList = (episodes: Episode[]) => episodes.map(mapPlayItem);
