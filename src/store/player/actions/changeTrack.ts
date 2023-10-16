import { PlayerState, Repeat } from '../types';

const random = (maxLimit: number, previous: number) => {
  let rand = Math.floor(Math.random() * maxLimit);
  if (rand === previous) {
    // avoid repeating same track
    rand = random(maxLimit, previous);
  }
  return rand;
};

const stopPlaying = (state: PlayerState) => {
  state.playlist = [];
  state.playing = false;
  state.currentIndex = -1;
};

// consider repeat, shuffle and playlist length;
const changeTrack = (state: PlayerState, goingNext: boolean) => {
  state.progress = 0;

  if (state.playlist.length === 0) {
    // shouldn't happen, just in case
    stopPlaying(state);
    return;
  }

  if (state.repeat === Repeat.ONE) return;

  if (state.shuffle) {
    state.currentIndex = random(state.playlist.length, state.currentIndex);
    return;
  }

  const currentFirst = state.currentIndex === 0;
  const currentLast = state.currentIndex === state.playlist.length - 1;
  if (state.repeat === Repeat.NO && ((goingNext && currentLast) || (!goingNext && currentFirst))) {
    stopPlaying(state);
    return;
  }

  if (state.repeat === Repeat.ALL) {
    if (goingNext && currentLast) {
      state.currentIndex = 0;
      return;
    }
    if (!goingNext && currentFirst) {
      state.currentIndex = state.playlist.length - 1;
      return;
    }
  }

  // all border cases covered, act as expected here
  state.currentIndex = goingNext ? state.currentIndex + 1 : state.currentIndex - 1;
};

export default changeTrack;
