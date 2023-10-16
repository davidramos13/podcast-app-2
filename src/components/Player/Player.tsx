import { Slide, Typography } from '@mui/material';
import tw from 'twin.macro';
import { useAppSelector } from '~/store';
import { selectPlayItem } from '~/store/player/selectors';
import Controls from './Controls';
import Progress from './Progress';
import Volume from './Volume';

const PlayerContainer = tw.div`fixed bottom-0 h-28 w-full pr-std bg-bgGray
  grid grid-cols-playerShort lg:grid-cols-playerLong gap-5 items-center`;
const Img = tw.img`w-full h-full`;
const TextContainer = tw.div`flex flex-col mr-std leading-5`;
const Text = tw(Typography)`leading-5`;

const Player = () => {
  const playItem = useAppSelector(({ player }) => selectPlayItem(player));
  const podcast = useAppSelector(({ podcastSearch }) => podcastSearch.currentPodcast);
  if (!playItem || !podcast) return null;

  return (
    <Slide direction="up" in={!!playItem} mountOnEnter unmountOnExit>
      <PlayerContainer>
        <Img src={playItem.imageUrl} alt={playItem.title} />
        <TextContainer>
          <Text tw="text-white">{playItem.title}</Text>
          <Text>{podcast.author}</Text>
        </TextContainer>
        <Controls />
        <Progress />
        <Volume />
      </PlayerContainer>
    </Slide>
  );
};

export default Player;
