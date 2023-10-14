import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import tw from 'twin.macro';

const DivContainer = tw(Container)`flex flex-col p-6`;

const Layout = () => (
  <main>
    <DivContainer fixed>
      <Outlet />
    </DivContainer>
    {/* Bottom Player here */}
  </main>
);

export default Layout;
