import { FC } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import tw, { styled } from 'twin.macro';
import { unforward } from '~/utils/styling';
import { useAppDispatch } from '~/store';
import { pause } from '~/store/player/slice';

const TwIconButton = styled(
  IconButton,
  unforward('playing'),
)<{ playing: boolean }>(({ playing }) => [playing && tw`bg-pauseBlue`]);

type Props = { playing: boolean; onPlay: () => void };
const PlayButton: FC<Props> = ({ playing, onPlay, ...props }) => {
  const dispatch = useAppDispatch();

  const onInternalClick = () => {
    if (playing) {
      dispatch(pause());
    } else {
      onPlay();
    }
  };

  return (
    <TwIconButton
      playing={playing}
      onClick={onInternalClick}
      {...props}
      data-testid="play-pause-button"
    >
      {playing ? (
        <PauseRoundedIcon data-testid="pause-icon" />
      ) : (
        <PlayArrowRoundedIcon data-testid="play-icon" />
      )}
    </TwIconButton>
  );
};
export default PlayButton;
