import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import PodcastSearch from './components/PodcastSearch';
import PodcastView from './components/PodcastView';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PodcastSearch /> },
      {
        path: 'podcast/:podcastId',
        element: <PodcastView />,
      },
    ],
  },
]);

export default router;
