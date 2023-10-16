import { IconButton } from '@mui/material';
import tw from 'twin.macro';
import { useAppDispatch, useAppSelector } from '~/store';
import { playPause } from '~/store/player/slice';
import PlayButton from '../ui/PlayButton';

const DivContainer = tw.div`grid grid-cols-controls gap-5 items-center`;
const StyledPlayButton = tw(PlayButton)`w-[50px] h-[50px]`;
const StyledIconButton = tw(IconButton)`w-10 h-10`;

const Controls = () => {
  const playing = useAppSelector(({ player }) => player.playing);
  const dispatch = useAppDispatch();

  const onPlayPause = () => dispatch(playPause());
  const onShuffle = () => ({});
  const onBackward = () => ({});
  const onForward = () => ({});
  const onRepeat = () => ({});

  return (
    <DivContainer>
      <StyledIconButton onClick={onShuffle}>
        <img src="/images/shuffle.svg" alt="shuffle" />
      </StyledIconButton>
      <StyledIconButton onClick={onBackward}>
        <img src="/images/backward.svg" alt="backward" />
      </StyledIconButton>
      <StyledPlayButton onClick={onPlayPause} playing={playing} />
      <StyledIconButton onClick={onForward}>
        <img src="/images/forward.svg" alt="forward" />
      </StyledIconButton>
      <StyledIconButton onClick={onRepeat}>
        <img src="/images/repeat.svg" alt="repeat" />
      </StyledIconButton>
    </DivContainer>
  );
};

export default Controls;
