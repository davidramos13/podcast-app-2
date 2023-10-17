import { IconButton, Typography } from '@mui/material';
import tw from 'twin.macro';
import { PlayerCell } from '../Player';

export const BackButton = tw(IconButton)`bg-bgGray rounded-[15px]`;
export const DivImage = tw.div`w-full h-[280px] mt-[22px] rounded-[15px]
  bg-podcast bg-cover bg-no-repeat bg-center`;
export const DivTitleContainer = tw.div`grid grid-cols-podcastView gap-2 lg:-mb-16 lg:gap-24`;
export const TitleText = tw(Typography)`text-[32px] text-center text-white font-bold`;
export const StyledPlayerCell = tw(PlayerCell)`h-[60px] w-[60px]`;
