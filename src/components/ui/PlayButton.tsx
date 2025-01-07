import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import tw, { styled } from 'twin.macro';
import { unforward } from '~/utils/styling';
import { useShallowAppStore } from '~/store';

const TwIconButton = styled(
  IconButton,
  unforward('playing'),
)<{ playing: boolean }>(({ playing }) => [playing && tw`bg-pauseBlue`]);

type Props = { playing: boolean; onPlay: () => void };

function PlayButton({ playing, onPlay, ...props }: Props) {
  const pause = useShallowAppStore(state => state.pause);

  const onInternalClick = () => {
    if (playing) {
      pause();
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
}

export default PlayButton;
