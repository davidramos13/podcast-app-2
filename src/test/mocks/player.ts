import { initialState as playerState } from '~/store/player/slice';
import { PlayerState } from '~/store/player/types';

const mapTrack = (id: number, duration: number = 4800) => ({
  episodeId: id,
  author: '',
  duration,
  title: `Track ${id}`,
  url: '',
  imageUrl: '',
});

export const withOneTrack = (id: number, duration: number) => ({
  playlist: [mapTrack(id, duration)],
  currentIndex: 0,
});

export const withTrackIds = (...ids: number[]) => ({
  playlist: ids.map(id => mapTrack(id)),
  currentIndex: 0,
});

export const getState = (playerParams: Partial<PlayerState>) => ({
  player: { ...playerState, ...playerParams },
  podcastSearch: {
    currentPodcast: { author: 'Random author' },
  },
});
