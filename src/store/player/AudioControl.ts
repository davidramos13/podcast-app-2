import { Track } from '~/entities';

type InitParams = {
  setTime: (time: number) => void;
  stop: () => void;
  nextTrack: () => void;
  volume: number;
};

class AudioControl extends Audio {
  track: Track | null = null;

  constructor() {
    super();
  }

  init(params: InitParams) {
    const { setTime, stop, nextTrack, volume } = params;
    this.addEventListener('timeupdate', () => {
      if (!this.track || !this.track.duration) return;
      setTime(this.currentTime);
    });

    this.addEventListener('error', event => {
      console.error('Audio error:', (event.target as AudioControl).error);
      stop();
    });

    this.addEventListener('ended', () => {
      nextTrack();
    });

    this.volume = volume / 100;
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

  playTrack(fromStart: boolean, params: { track: Track }) {
    const { track } = params;
    if (!track) {
      this.clear();
      return;
    }

    this.setSrc(track, fromStart);
    this.play().catch(e => {
      console.error(e);
    });
  }

  setVolume(volume: number) {
    this.volume = volume / 100;
  }
}

const audio = new AudioControl();

export default audio;
