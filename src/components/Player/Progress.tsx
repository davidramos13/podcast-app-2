import { LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import tw, { css, styled } from 'twin.macro';
import { useAppSelector } from '~/store';
import { selectProgress } from '~/store/player/selectors';
import { calculateDuration } from '~/utils/dates';

const DivContainer = tw.div`flex mx-std items-center`;
const BarProgress = styled(LinearProgress)(() => [
  tw`w-full h-[5px] mx-std rounded-lg bg-[#FFFFFF4D]`,
  css`
    & span {
      background-color: white;
    }
  `,
]);

const Progress = () => {
  const { progress, duration } = useAppSelector(({ player }) => selectProgress(player));
  const startTime = calculateDuration(progress);
  const endTime = calculateDuration(duration);

  return (
    <DivContainer>
      <Typography>{startTime}</Typography>
      <BarProgress variant="determinate" value={progress} />
      <Typography tw="text-white">{endTime}</Typography>
    </DivContainer>
  );
};

export default memo(Progress);
