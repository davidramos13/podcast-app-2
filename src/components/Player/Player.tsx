import { Slide } from '@mui/material';
import tw from 'twin.macro';
import { useAppDispatch, useAppSelector } from '~/store';
import { selectPlayerBarData } from '~/store/player/selectors';
import { playPause } from '~/store/player/slice';
import PlayButton from '../ui/PlayButton';

const PlayerContainer = tw.div`fixed bottom-0 h-28 w-full bg-blue-600`;

const Player = () => {
  const dispatch = useAppDispatch();
  const { visible, playing } = useAppSelector(({ player }) => selectPlayerBarData(player));

  const onClick = () => {
    dispatch(playPause({}));
  };

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <PlayerContainer>
        <PlayButton playing={playing} onClick={onClick} />
      </PlayerContainer>
    </Slide>
  );
};

export default Player;
