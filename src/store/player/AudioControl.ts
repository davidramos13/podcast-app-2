import { Track } from '~/entities';

type InitParams = {
  getTrack: () => Track;
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
    debugger;
    const { getTrack, setTime, stop, nextTrack, volume } = params;
    this.addEventListener('timeupdate', () => {
      const track = getTrack();
      if (!track || !track.duration) return;
      setTime(this.currentTime);
    });

    this.addEventListener('error', () => {
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

  playTrack(fromStart: boolean, params: { track: Track; stopAction: () => void }) {
    const { track, stopAction } = params;
    if (!track) {
      this.clear();
      return;
    }

    this.setSrc(track, fromStart);
    this.play().catch(() => stopAction());
  }

  setVolume(volume: number) {
    this.volume = volume / 100;
  }
}

const audio = new AudioControl();

export default audio;
