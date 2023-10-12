import { RouterProvider } from 'react-router-dom';
import router from './router';
import StylesProvider from './styles/StylesProvider';

const App = () => (
  <StylesProvider>
    <RouterProvider router={router} />
  </StylesProvider>
);

export default App;
