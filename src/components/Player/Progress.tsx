import { LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { memo, useMemo } from 'react';
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
const Text = tw(Typography)`w-14`;

const getBarPercentage = (time = 0, duration = 0) => {
  if (!duration || !time) return 0;
  const percentage = Math.round((time / duration) * 1000) / 10;
  return percentage;
};

const Progress = () => {
  const { currentTime, duration } = useAppSelector(({ player }) => selectProgress(player));

  const startTime = calculateDuration(currentTime);
  const endTime = useMemo(() => calculateDuration(duration), [duration]);
  const percentage = getBarPercentage(currentTime, duration);

  return (
    <DivContainer>
      <Text>{startTime}</Text>
      <BarProgress variant="determinate" value={percentage} />
      <Text tw="text-white">{endTime}</Text>
    </DivContainer>
  );
};

export default memo(Progress);
