import { render as baseRender } from '@testing-library/react';
import { DefaultBodyType, rest } from 'msw';
import { SetupServer, setupServer } from 'msw/node';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';

type Options = { route?: string };

export const render = (ui: ReactElement, options: Options = {}) => {
  const { route } = options;
  if (!route) {
    return baseRender(<MemoryRouter>{ui}</MemoryRouter>);
  }

  return baseRender(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

type MockCall = { url: string; data: DefaultBodyType };
const getHandlers = (mockCalls: MockCall[]) =>
  mockCalls.map(call => rest.get(call.url, (_req, res, ctx) => res(ctx.json(call.data))));

export const getServer = (mockCalls: MockCall[]) => setupServer(...getHandlers(mockCalls));

export const replaceServerHandlers = (server: SetupServer, mockCalls: MockCall[]) =>
  server.resetHandlers(...getHandlers(mockCalls));
