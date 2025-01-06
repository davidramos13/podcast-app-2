import { PlayPayload, PlayerActions, PlayerSlice } from './types';
import { changeTrack, getNextRepeat, play } from './utils';
import { GetState, SetState } from '../types';
import { selectTrack } from './selectors';
import audio from '../player/AudioControl';

const playParams = (get: GetState<PlayerSlice>) => {
  const track = selectTrack(get());
  return { track };
};

const actions = (set: SetState<PlayerSlice>, get: GetState<PlayerSlice>): PlayerActions => {
  return {
    play: (payload: PlayPayload) => {
      set(state => play(state, payload), undefined, 'play');
      audio.playTrack(false, playParams(get));
    },
    pause: () => {
      set({ playing: false }, undefined, 'pause');
      audio.pause();
    },
    stop: () => {
      set({ playing: false, currentTime: 0 }, undefined, 'stop');
      audio.clear();
    },
    nextTrack: () => {
      set(state => changeTrack(state, true), undefined, 'nextTrack');
      if (!get().playing) return;
      audio.playTrack(true, playParams(get));
    },
    prevTrack: () => {
      set(state => changeTrack(state, false), undefined, 'prevTrack');
      if (!get().playing) return;
      audio.playTrack(true, playParams(get));
    },
    setCurrentTime: (time: number) => set({ currentTime: time }),
    setRepeat: () =>
      set(state => ({ repeat: getNextRepeat(state.repeat) }), undefined, 'setRepeat'),
    setShuffle: () => set(state => ({ shuffle: !state.shuffle }), undefined, 'setShuffle'),
    setVolume: (volume: number) => {
      set({ volume }, undefined, 'setVolume');
      audio.setVolume(volume);
    },
  };
};

export default actions;

// if (getLastPodcastEpisode.matchFulfilled(action)) {
//   audioPlay(false);
// }
