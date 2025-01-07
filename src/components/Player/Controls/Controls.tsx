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

import PlayButton from '~/components/ui/PlayButton';
import { selectControlsActions, selectControlsState } from '~/store/player/selectors';
import { Repeat } from '~/store/player/types';
import { useShallowAppStore } from '~/store';

const DivContainer = tw.div`grid grid-cols-controls gap-5 items-center`;
const StyledPlayButton = tw(PlayButton)`w-[50px] h-[50px]`;
const StyledIconButton = tw(IconButton)`w-10 h-10`;

const repeatIcons = {
  [Repeat.NO]: <RepeatRoundedIcon data-testid="repeat-no" />,
  [Repeat.ALL]: <RepeatOnRoundedIcon data-testid="repeat-all" />,
  [Repeat.ONE]: <RepeatOneOnRoundedIcon data-testid="repeat-one" />,
};

const Controls = () => {
  const { playing, shuffle, repeat, disableNext, disablePrevious, disableShuffle } =
    useShallowAppStore(selectControlsState);
  const { play, setShuffle, prevTrack, nextTrack, setRepeat } =
    useShallowAppStore(selectControlsActions);

  const shuffleIcon = shuffle ? (
    <ShuffleOnRoundedIcon data-testid="shuffle-on" />
  ) : (
    <ShuffleRoundedIcon data-testid="shuffle-off" />
  );
  const repeatIcon = repeatIcons[repeat];

  return (
    <DivContainer>
      <StyledIconButton onClick={setShuffle} disabled={disableShuffle} data-testid="shuffle-btn">
        {shuffleIcon}
      </StyledIconButton>
      <StyledIconButton onClick={prevTrack} disabled={disablePrevious} data-testid="prev-track-btn">
        <SkipPreviousRoundedIcon />
      </StyledIconButton>
      <StyledPlayButton onPlay={play} playing={playing} />
      <StyledIconButton onClick={nextTrack} disabled={disableNext} data-testid="next-track-btn">
        <SkipNextRoundedIcon />
      </StyledIconButton>
      <StyledIconButton onClick={setRepeat} data-testid="repeat-btn">
        {repeatIcon}
      </StyledIconButton>
    </DivContainer>
  );
};

export default memo(Controls);
