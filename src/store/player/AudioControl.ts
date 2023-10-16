import { Track } from '~/entities';

class AudioControl extends Audio {
  track: Track | null = null;

  constructor() {
    super();
  }

  clear() {
    this.src = '';
    this.track = null;
  }

  setSrc(src: Track | null, fromStart: boolean) {
    if (fromStart) {
      this.currentTime = 0;
    }

    if (!src) {
      if (this.track) {
        this.clear();
      }
      return;
    }

    if (this.track?.episodeId === src.episodeId) return;

    this.currentTime = 0;
    this.track = src;
    this.src = src.url;
  }
}

export default AudioControl;
