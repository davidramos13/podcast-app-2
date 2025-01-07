import { PlayerSlice, Repeat } from './types';

export const selectTrack = ({ playlist, currentIndex }: PlayerSlice) => playlist[currentIndex];

export const selectProgress = (slice: PlayerSlice) => {
  const { duration } = selectTrack(slice);
  const { currentTime } = slice;
  return { currentTime, duration };
};

export const selectIsPlayingThisEpisode = (episodeId: number) => (slice: PlayerSlice) => {
  const track = selectTrack(slice);
  return track && slice.playing ? track.episodeId === episodeId : false;
};

export const selectControlsState = (slice: PlayerSlice) => {
  const { currentIndex, playing, shuffle, repeat, playlist } = slice;
  const currentLast = currentIndex === playlist.length - 1;

  const disableShuffle = playlist.length < 2;
  const disableNext = currentLast && repeat === Repeat.NO;
  const disablePrevious = shuffle || (currentIndex === 0 && repeat === Repeat.NO);

  return { playing, shuffle, repeat, disableShuffle, disableNext, disablePrevious };
};

export const selectControlsActions = (slice: PlayerSlice) => {
  const { play, setShuffle, setRepeat, nextTrack, prevTrack } = slice;
  return { play, setShuffle, setRepeat, nextTrack, prevTrack };
};
