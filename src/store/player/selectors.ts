import { PlayerSlice, Repeat } from './types';

export const selectTrack = ({ playlist, currentIndex }: PlayerSlice) => playlist[currentIndex];

export const selectProgress = (slice: PlayerSlice) => {
  const { duration } = selectTrack(slice);
  const { currentTime } = slice;
  return { currentTime, duration };
};

export const selectIsPlayingThisEpisode = (slice: PlayerSlice, episodeId: number) => {
  const track = selectTrack(slice);
  const { playing } = slice;
  return !playing ? false : track.episodeId === episodeId;
};

export const selectPlayerControlsState = (slice: PlayerSlice) => {
  const { currentIndex, playing, shuffle, repeat, playlist } = slice;
  const currentLast = currentIndex === playlist.length - 1;

  const disableShuffle = playlist.length < 2;
  const disableNext = currentLast && repeat === Repeat.NO;
  const disablePrevious = shuffle || (currentIndex === 0 && repeat === Repeat.NO);

  return { playing, shuffle, repeat, disableShuffle, disableNext, disablePrevious };
};
