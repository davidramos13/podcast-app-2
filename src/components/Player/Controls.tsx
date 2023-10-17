import { IconButton } from '@mui/material';
import { memo } from 'react';
import tw from 'twin.macro';

import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import ShuffleOnRoundedIcon from '@mui/icons-material/ShuffleOnRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import RepeatOnRoundedIcon from '@mui/icons-material/RepeatOnRounded';
import RepeatOneOnRoundedIcon from '@mui/icons-material/RepeatOneOnRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';

import { useAppDispatch, useAppSelector } from '~/store';
import { nextTrack, playPause, prevTrack, setRepeat, setShuffle } from '~/store/player/slice';
import PlayButton from '../ui/PlayButton';
import { selectPlayerControlsState } from '~/store/player/selectors';
import { Repeat } from '~/store/player/types';

const DivContainer = tw.div`grid grid-cols-controls gap-5 items-center`;
const StyledPlayButton = tw(PlayButton)`w-[50px] h-[50px]`;
const StyledIconButton = tw(IconButton)`w-10 h-10`;

const repeatIcons = {
  [Repeat.NO]: <RepeatRoundedIcon />,
  [Repeat.ALL]: <RepeatOnRoundedIcon />,
  [Repeat.ONE]: <RepeatOneOnRoundedIcon />,
};

const Controls = () => {
  const { playing, shuffle, repeat, disableNext, disablePrevious, disableShuffle } = useAppSelector(
    ({ player }) => selectPlayerControlsState(player),
  );
  const dispatch = useAppDispatch();

  const onPlayPause = () => dispatch(playPause());
  const onShuffle = () => dispatch(setShuffle());
  const onBackward = () => dispatch(prevTrack());
  const onForward = () => dispatch(nextTrack());
  const onRepeat = () => dispatch(setRepeat());

  const shuffleIcon = shuffle ? <ShuffleOnRoundedIcon /> : <ShuffleRoundedIcon />;
  const repeatIcon = repeatIcons[repeat];

  return (
    <DivContainer>
      <StyledIconButton onClick={onShuffle} disabled={disableShuffle}>
        {shuffleIcon}
      </StyledIconButton>
      <StyledIconButton
        onClick={onBackward}
        disabled={disablePrevious}
        data-testid="prev-track-btn"
      >
        <SkipPreviousRoundedIcon />
      </StyledIconButton>
      <StyledPlayButton onClick={onPlayPause} playing={playing} />
      <StyledIconButton onClick={onForward} disabled={disableNext} data-testid="next-track-btn">
        <SkipNextRoundedIcon />
      </StyledIconButton>
      <StyledIconButton onClick={onRepeat}>{repeatIcon}</StyledIconButton>
    </DivContainer>
  );
};

export default memo(Controls);
