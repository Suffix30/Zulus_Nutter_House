class AudioManager {
  private spinSound: HTMLAudioElement;
  private winSound: HTMLAudioElement;

  constructor() {
    this.spinSound = new Audio('/sounds/spin.mp3');
    this.winSound = new Audio('/sounds/win.mp3');
    
    this.spinSound.load();
    this.winSound.load();
  }

  playSpinSound(enabled: boolean) {
    if (!enabled) return;
    
    this.spinSound.currentTime = 0;
    this.spinSound.play().catch(() => {
      console.warn('Sound playback failed. User interaction might be required.');
    });
  }

  playWinSound(enabled: boolean) {
    if (!enabled) return;
    
    this.winSound.currentTime = 0;
    this.winSound.play().catch(() => {
      console.warn('Sound playback failed. User interaction might be required.');
    });
  }
}

const audioManager = new AudioManager();

export const playSpinSound = (enabled: boolean) => audioManager.playSpinSound(enabled);
export const playWinSound = (enabled: boolean) => audioManager.playWinSound(enabled);