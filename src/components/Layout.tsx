import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import tw from 'twin.macro';
import Player from './Player';

const DivContainer = tw(Container)`flex flex-col p-6`;

const Layout = () => (
  <main>
    <DivContainer fixed>
      <Outlet />
    </DivContainer>
    <Player />
  </main>
);

export default Layout;
