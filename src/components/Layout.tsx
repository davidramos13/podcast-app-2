import { Outlet } from "react-router-dom";
import tw from "twin.macro";

const Main = tw.main`flex flex-col items-center`;

const Layout = () => (
  <Main>
    <Outlet />
    {/* Bottom Player here */}
  </Main>
  );

export default Layout;
