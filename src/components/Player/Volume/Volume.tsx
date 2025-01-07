import { Slider } from '@mui/material';
import { memo } from 'react';
import tw from 'twin.macro';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useShallowAppStore } from '~/store';

const DivContainer = tw.div`flex mx-std items-center`;
const StyledSlider = tw(Slider)`ml-3 text-white`;

const Volume = () => {
  const { volume, setVolume } = useShallowAppStore(['volume', 'setVolume']);

  const onChange = (_: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  return (
    <DivContainer>
      <VolumeUpIcon tw="text-white" />
      <StyledSlider value={volume} onChange={onChange} size="small" />
    </DivContainer>
  );
};

export default memo(Volume);
