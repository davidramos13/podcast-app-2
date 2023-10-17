import { CircularProgress, Container } from '@mui/material';
import tw from 'twin.macro';

const DivContainer = tw(Container)`w-full h-12 mt-6 flex justify-center items-center`;

const Spinner = () => (
  <DivContainer>
    <CircularProgress data-testid="spinner" />
  </DivContainer>
);

export default Spinner;
