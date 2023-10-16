import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import tw from 'twin.macro';
import Player from './Player';

const DivContainer = tw(Container)`flex flex-col p-6 xl:max-w-[1280px]`;

const Layout = () => (
  <main>
    <DivContainer fixed>
      <Outlet />
    </DivContainer>
    <Player />
  </main>
);

export default Layout;
