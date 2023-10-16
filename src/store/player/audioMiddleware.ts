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
import { PlayerState } from './types';

const audio = new AudioControl();
const { nextTrack, prevTrack, playPause, stop, setVolume } = playerSlice.actions;
const { getLastPodcastEpisode } = episodesApi.endpoints;
const changeTrackTypes = [nextTrack, prevTrack].map(action => action.type);

const audioMiddleware: Middleware<
  unknown,
  RootState,
  ThunkDispatch<unknown, unknown, AnyAction>
> = store => {
  audio.addEventListener('timeupdate', () => {
    const track = selectTrack(store.getState().player);
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

  const play = (player: PlayerState, fromStart = false) => {
    const track = selectTrack(player);
    if (!track) {
      audio.clear();
      return;
    }
    if (!player.playing) {
      audio.pause();
      return;
    }
    audio.setSrc(track, fromStart);
    audio.play().catch(() => store.dispatch(stopInvoke()));
  };

  return next => action => {
    const result = next(action); // run state changes first, then check outputs

    const { player } = store.getState();

    if (changeTrackTypes.includes(action.type)) {
      play(player, true);
    } else if (action.type === playPause.type || getLastPodcastEpisode.matchFulfilled(action)) {
      play(player, false);
    } else if (action.type === stop.type) {
      audio.clear();
    } else if (action.type === setVolume.type) {
      const { volume } = player;
      audio.volume = volume / 100;
    }

    return result;
  };
};

export default audioMiddleware;
