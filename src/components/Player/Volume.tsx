import { Slider } from '@mui/material';
import tw from 'twin.macro';
import { useAppDispatch, useAppSelector } from '~/store';
import { setVolume } from '~/store/player/slice';

const DivContainer = tw.div`flex mx-std items-center`;
const StyledSlider = tw(Slider)`ml-3 text-white`;

const Volume = () => {
  const volume = useAppSelector(({ player }) => player.volume);
  const dispatch = useAppDispatch();

  const onChange = (event: Event, newValue: number | number[]) => {
    dispatch(setVolume(newValue as number));
  };

  return (
    <DivContainer>
      <img src="/images/volume.svg" alt="volume" />
      <StyledSlider value={volume} onChange={onChange} size="small" />
    </DivContainer>
  );
};

export default Volume;
