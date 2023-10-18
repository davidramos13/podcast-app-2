import { AnyAction, Middleware, ThunkDispatch } from '@reduxjs/toolkit';
import type { RootState } from '..';
import episodesApi from '../episodesApi';
import AudioControl from './AudioControl';
import { selectTrack } from './selectors';
import playerSlice, {
  nextTrack as nextTrackInvoke,
  setCurrentTime,
  stop as stopInvoke,
} from './slice';

export type AudioMiddleware = Middleware<
  unknown,
  RootState,
  ThunkDispatch<unknown, unknown, AnyAction>
>;

const audio = new AudioControl();
const { nextTrack, prevTrack, play, pause, stop, setVolume } = playerSlice.actions;
const { getLastPodcastEpisode } = episodesApi.endpoints;
const changeTrackTypes = [nextTrack, prevTrack].map(action => action.type);

const audioMiddleware: AudioMiddleware = store => {
  audio.addEventListener('timeupdate', () => {
    const track = selectTrack(store.getState());
    if (!track || !track.duration) return;
    store.dispatch(setCurrentTime(audio.currentTime));
  });

  audio.addEventListener('error', () => {
    store.dispatch(stopInvoke());
  });

  audio.addEventListener('ended', () => {
    store.dispatch(nextTrackInvoke());
  });

  audio.volume = store.getState().player.volume / 100;

  const audioPlay = (fromStart = false) => {
    const state = store.getState();
    const track = selectTrack(state);
    if (!track) {
      audio.clear();
      return;
    }

    audio.setSrc(track, fromStart);
    audio.play().catch(() => store.dispatch(stopInvoke()));
  };

  return next => action => {
    const result = next(action); // run state changes first, then check outputs

    if (changeTrackTypes.includes(action.type)) {
      audioPlay(true);
    } else if (action.type === play.type || getLastPodcastEpisode.matchFulfilled(action)) {
      audioPlay(false);
    } else if (action.type === pause.type) {
      audio.pause();
    } else if (action.type === stop.type) {
      audio.clear();
    } else if (action.type === setVolume.type) {
      const { volume } = store.getState().player;
      audio.volume = volume / 100;
    }

    return result;
  };
};

export default audioMiddleware;
