import { Howl } from 'howler';

class AudioService {
  private sounds: Record<string, Howl> = {};
  private initialized = false;
  private soundEnabled = true;

  initialize() {
    if (this.initialized) return;

    const soundFiles = {
      spin: new URL('/sounds/spin.mp3', import.meta.url).href,
      win: new URL('/sounds/win.mp3', import.meta.url).href,
      pgMode: new URL('/sounds/pg_mode.mp3', import.meta.url).href,
      rMode: new URL('/sounds/r_mode.mp3', import.meta.url).href,
      truth: new URL('/sounds/truth.mp3', import.meta.url).href,
      dare: new URL('/sounds/dare.mp3', import.meta.url).href,
      drink: new URL('/sounds/drink.mp3', import.meta.url).href,
      wouldYouRather: new URL('/sounds/would_you_rather.mp3', import.meta.url).href
    };

    Object.entries(soundFiles).forEach(([key, path]) => {
      this.sounds[key] = new Howl({
        src: [path],
        volume: 0.5,
        preload: true,
        html5: true,
        onload: () => {
        },
        onloaderror: (_: unknown, error: unknown) => {
          console.error(`Error loading sound ${key}:`, error);
        }
      });
    });

    this.initialized = true;
  }

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stopAll();
    }
  }

  playSound(soundName: string) {
    if (!this.soundEnabled || !this.sounds[soundName]) return;
    
    try {
      const sound = this.sounds[soundName];
      if (sound.state() === 'loaded') {
        sound.play();
      } else {
        sound.once('load', () => {
          sound.play();
        });
      }
    } catch (error) {
      console.error(`Error playing sound ${soundName}:`, error);
    }
  }

  playSpinSound() {
    this.playSound('spin');
  }

  playWinSound() {
    this.playSound('win');
  }

  playPGModeSound() {
    this.playSound('pgMode');
  }

  playRModeSound() {
    this.playSound('rMode');
  }

  playTruthSound() {
    this.playSound('truth');
  }

  playDareSound() {
    this.playSound('dare');
  }

  playDrinkSound() {
    this.playSound('drink');
  }

  playWouldYouRatherSound() {
    this.playSound('wouldYouRather');
  }

  stopAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.stop();
    });
  }
}

export const audioService = new AudioService();