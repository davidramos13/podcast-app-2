import { Slide, Typography } from '@mui/material';
import tw from 'twin.macro';
import { selectTrack } from '~/store/player/selectors';
import Controls from './Controls';
import Progress from './Progress';
import Volume from './Volume';
import { useShallowAppStore } from '~/store';

const PlayerContainer = tw.div`fixed bottom-0 h-28 w-full pr-std bg-bgGray
  grid grid-cols-playerShort lg:grid-cols-playerLong gap-5 items-center`;
const Img = tw.img`w-full h-full`;
const TextContainer = tw.div`flex flex-col mr-std leading-5`;
const Text = tw(Typography)`leading-5`;

const Player = () => {
  const track = useShallowAppStore(selectTrack);
  if (!track) return null;

  return (
    <Slide direction="up" in={!!track} mountOnEnter unmountOnExit>
      <PlayerContainer>
        <Img src={track.imageUrl} alt={track.title} />
        <TextContainer>
          <Text tw="text-white">{track.title}</Text>
          <Text>{track.author}</Text>
        </TextContainer>
        <Controls />
        <Progress />
        <Volume />
      </PlayerContainer>
    </Slide>
  );
};

export default Player;
