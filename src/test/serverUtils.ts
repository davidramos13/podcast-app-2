import { DefaultBodyType, rest } from 'msw';
import { setupServer, SetupServer } from 'msw/node';

type MockCall = { url: string; data: DefaultBodyType };
const getHandlers = (mockCalls: MockCall[]) =>
  mockCalls.map(call => rest.get(call.url, (_req, res, ctx) => res(ctx.json(call.data))));

export const getServer = (mockCalls: MockCall[]) => setupServer(...getHandlers(mockCalls));

export const replaceServerHandlers = (server: SetupServer, mockCalls: MockCall[]) =>
  server.resetHandlers(...getHandlers(mockCalls));

type OtherEvents = {
  afterEach?: () => void;
};

export const createServerHooks = (server: SetupServer, events: OtherEvents = {}) => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    const { afterEach } = events;
    if (afterEach) afterEach();
  });

  afterAll(() => {
    server.close();
  });
};
