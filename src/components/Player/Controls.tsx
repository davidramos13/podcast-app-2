import tw from 'twin.macro';
import { useAppDispatch, useAppSelector } from '~/store';
import { playPause } from '~/store/player/slice';
import PlayButton from '../ui/PlayButton';

const DivContainer = tw.div`grid grid-cols-controls gap-[30px]`;

const Controls = () => {
  const playing = useAppSelector(({ player }) => player.playing);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(playPause());
  };

  return (
    <DivContainer>
      <p>1</p>
      <p>2</p>
      <PlayButton onClick={onClick} playing={playing} />
      <p>3</p>
      <p>4</p>
    </DivContainer>
  );
};

export default Controls;
