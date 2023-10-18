import { PodcastFull } from '~/entities';
import { mapTrack, createPlayList } from '~/entities/track';
import { PlayerState } from '../types';

export type PlayPayload = undefined | { episodeId?: number; podcastFull?: PodcastFull };
const playReducer = (state: PlayerState, payload: PlayPayload = {}) => {
  state.playing = true;
  const { episodeId, podcastFull } = payload;
  if (podcastFull) {
    const track = mapTrack(podcastFull.episodes[0], podcastFull.author);
    state.playlist = [track];
    state.currentIndex = 0;
    return;
  }
  if (!episodeId || !state.viewPodcast) return;

  state.playlist = createPlayList(state.viewPodcast);
  state.currentIndex = state.playlist.findIndex(x => x.episodeId === episodeId);
};

export default playReducer;
