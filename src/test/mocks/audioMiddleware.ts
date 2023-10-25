import { AudioMiddleware } from '~/store/player/audioMiddleware';

export const mockAudioMiddleware = () => {
  vi.mock('~/store/player/audioMiddleware', () => {
    const mockMiddleware: AudioMiddleware = () => next => action => next(action);
    return { default: mockMiddleware };
  });
};
