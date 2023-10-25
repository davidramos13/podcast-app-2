import { Slider } from '@mui/material';
import { memo } from 'react';
import tw from 'twin.macro';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useAppDispatch, useAppSelector } from '~/store';
import { setVolume } from '~/store/player/slice';

const DivContainer = tw.div`flex mx-std items-center`;
const StyledSlider = tw(Slider)`ml-3 text-white`;

const Volume = () => {
  const volume = useAppSelector(({ player }) => player.volume);
  const dispatch = useAppDispatch();

  const onChange = (_: Event, newValue: number | number[]) => {
    dispatch(setVolume(newValue as number));
  };

  return (
    <DivContainer>
      <VolumeUpIcon tw="text-white" />
      <StyledSlider value={volume} onChange={onChange} size="small" />
    </DivContainer>
  );
};

export default memo(Volume);
