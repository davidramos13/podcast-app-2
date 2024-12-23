import { Episode } from '~/entities';
import { PlayPayload, PlayerActions, PlayerSlice } from './types';
import { changeTrack, getNextRepeat, play } from './utils';
import { GetState, SetState } from '../types';
import { selectTrack } from './selectors';
import audio from '../player/AudioControl';

const playParams = (get: GetState<PlayerSlice>) => {
  const track = selectTrack(get());
  const stopAction = get().stop;
  return { track, stopAction };
};

const actions = (set: SetState<PlayerSlice>, get: GetState<PlayerSlice>): PlayerActions => ({
  play: (payload: PlayPayload) => {
    set(state => play(state, payload));
    audio.playTrack(false, playParams(get));
  },
  pause: () => {
    set({ playing: false });
    audio.pause();
  },
  stop: () => {
    set({ playing: false, currentTime: 0 });
    audio.clear();
  },
  nextTrack: () => {
    set(state => changeTrack(state, true));
    audio.playTrack(true, playParams(get));
  },
  prevTrack: () => {
    set(state => changeTrack(state, false));
    audio.playTrack(true, playParams(get));
  },
  setCurrentTime: (time: number) => set({ currentTime: time }),
  setRepeat: () => set(state => ({ repeat: getNextRepeat(state.repeat) })),
  setShuffle: () => set(state => ({ shuffle: !state.shuffle })),
  setVolume: (volume: number) => {
    set({ volume });
    audio.setVolume(volume);
  },
  changeEpisodes: (episodes: Episode[]) =>
    set(state => (!state.viewPodcast ? {} : { viewPodcast: { ...state.viewPodcast, episodes } })),
  clearPodcast: () => set({ viewPodcast: null }),
});

export default actions;

// if (getLastPodcastEpisode.matchFulfilled(action)) {
//   audioPlay(false);
// }
