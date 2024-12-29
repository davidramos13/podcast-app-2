import { createPlayList, mapTrack } from '~/entities/track';
import { PlayPayload, PlayerState, Repeat } from './types';

const repeatOrder = [Repeat.NO, Repeat.ALL, Repeat.ONE];

export const getNextRepeat = (current: Repeat) => {
  const index = repeatOrder.findIndex(x => x === current);
  return index === 2 ? repeatOrder[0] : repeatOrder[index + 1];
};

export const play = (state: PlayerState, payload: PlayPayload = {}) => {
  const newState: Partial<PlayerState> = { playing: true };
  const { episodeId, podcastFull } = payload;

  if (podcastFull) {
    const track = mapTrack(podcastFull.episodes[0], podcastFull.author);
    newState.playlist = [track];
    newState.currentIndex = 0;
    return newState;
  }

  if (!episodeId || !state.activePodcast) return newState;

  // newState.playlist = createPlayList(state.viewPodcast);
  newState.currentIndex = state.playlist.findIndex(x => x.episodeId === episodeId);
  return newState;
};

const random = (maxLimit: number, previous: number) => {
  let rand = Math.floor(Math.random() * maxLimit);
  if (rand === previous) {
    // avoid repeating same track
    rand = random(maxLimit, previous);
  }
  return rand;
};

export const stopPlaying = () => ({ playlist: [], playing: false, currentIndex: -1 });

// consider repeat, shuffle and playlist length;
export const changeTrack = (state: PlayerState, goingNext: boolean) => {
  const newState: Partial<PlayerState> = { currentTime: 0 };

  if (state.playlist.length === 0) {
    // shouldn't happen, just in case
    return { ...newState, ...stopPlaying() };
  }

  if (state.repeat === Repeat.ONE) return newState;

  if (state.shuffle) {
    return { ...newState, currentIndex: random(state.playlist.length, state.currentIndex) };
  }

  const currentFirst = state.currentIndex === 0;
  const currentLast = state.currentIndex === state.playlist.length - 1;
  if (state.repeat === Repeat.NO && ((goingNext && currentLast) || (!goingNext && currentFirst))) {
    return { ...newState, ...stopPlaying() };
  }

  if (state.repeat === Repeat.ALL) {
    if (goingNext && currentLast) {
      return { ...newState, currentIndex: 0 };
    }
    if (!goingNext && currentFirst) {
      return { ...newState, currentIndex: state.playlist.length - 1 };
    }
  }

  // all border cases covered, act as expected here
  return { ...newState, currentIndex: goingNext ? state.currentIndex + 1 : state.currentIndex - 1 };
};
