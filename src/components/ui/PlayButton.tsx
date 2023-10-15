import { FC } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';

type Props = { playing: boolean; onClick: () => void };
const PlayButton: FC<Props> = ({ playing, onClick }) => (
  <IconButton onClick={onClick}>
    {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
  </IconButton>
);

export default PlayButton;
