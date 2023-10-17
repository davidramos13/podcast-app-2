import { render as baseRender, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { StoreType } from '~/store';

type RouteOptions = { path: string; [key: string]: string };
type Options = {
  route?: RouteOptions;
} & RenderOptions;

const getRouteWrapper = (ui: ReactElement, route?: RouteOptions) => {
  if (!route) return <MemoryRouter>{ui}</MemoryRouter>;

  const { path, ...rest } = route;
  // expects something like { path: podcast/:podcastId, podcastId: 3 } and generates both path and replaced url
  const entry = Object.keys(rest).reduce((prev, key) => prev.replace(`:${key}`, rest[key]), path);
  return (
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

export const render = (ui: ReactElement, store: StoreType, options: Options = {}) => {
  const { route, ...renderOptions } = options;
  const jsx = getRouteWrapper(ui, route);
  return baseRender(<Provider store={store}>{jsx}</Provider>, renderOptions);
};
