import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return <p>Page not found.</p>;
};

export default ErrorPage;
