import { FC } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import tw, { styled } from 'twin.macro';
import { unforward } from '~/utils/styling';

const TwIconButton = styled(
  IconButton,
  unforward('playing'),
)<{ playing: boolean }>(({ playing }) => [playing && tw`bg-pauseBlue`]);

type Props = { playing: boolean; onClick: () => void };
const PlayButton: FC<Props> = ({ playing, onClick, ...props }) => (
  <TwIconButton playing={playing} onClick={onClick} {...props}>
    {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
  </TwIconButton>
);

export default PlayButton;
