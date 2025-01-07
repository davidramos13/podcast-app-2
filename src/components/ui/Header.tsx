import { PropsWithChildren } from 'react';
import tw from 'twin.macro';

const DivContainer = tw.div`flex h-[50px] gap-5 mt-1.5 mb-5`;

function Header({ children }: PropsWithChildren) {
  return <DivContainer>{children}</DivContainer>;
}

export default Header;
