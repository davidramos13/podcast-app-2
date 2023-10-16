import { Track } from '~/entities';
import { PlayerState } from '../types';

type PlayPayloadComplete = { selectedId: number; playlist: Track[] };
export type PlayPayload = PlayPayloadComplete | undefined;

const loadList = (state: PlayerState, { selectedId, playlist }: PlayPayloadComplete) => {
  state.playlist = playlist;
  state.currentIndex = playlist.findIndex(x => x.episodeId === selectedId);
};

/*
  LOAD = set received values (playlist and index for id)

  logic here:
  - no playlist loaded
      - nothing received => return
      - received payload => LOAD & PLAY
  - playlist loaded
      - nothing received => PLAY/PAUSE
      - received payload
          LOAD (might set state.playlist to the same value, or not)
          - current id === new id => PLAY/PAUSE
          - current id !== new id => PLAY
*/

const playPauseAction = (state: PlayerState, payload?: PlayPayload) => {
  if (!state.playlist.length) {
    if (!payload) return;
    loadList(state, payload);
    state.playing = true;
    return;
  }

  if (!payload) {
    state.playing = !state.playing;
    return;
  }

  const currentId = state.playlist[state.currentIndex].episodeId;
  loadList(state, payload);
  state.playing = currentId === payload.selectedId ? !state.playing : true;
};

export default playPauseAction;
