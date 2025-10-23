// 代码生成时间: 2025-10-23 10:31:57
import { Injectable } from '@angular/core';

// SoundManager is an Angular service that manages audio effects.
@Injectable({
  providedIn: 'root'
})
export class SoundManager {

  private audioContext: AudioContext;
  private sounds: Map<string, AudioBuffer>;

  constructor() {
    this.sounds = new Map<string, AudioBuffer>();

    // Initialize the AudioContext
    try {
      this.audioContext = new (window as any).AudioContext();
    } catch (error) {
      console.error('Failed to initialize the AudioContext:', error);
      throw new Error('AudioContext initialization failed.');
    }
  }

  // Loads an audio file into the sounds map
  loadSound(key: string, url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';

      request.onload = () => {
        if (request.status === 200) {
          this.audioContext.decodeAudioData(request.response).then((buffer) => {
            this.sounds.set(key, buffer);
            resolve();
          }).catch((error) => {
            console.error('Failed to decode audio data:', error);
            reject(error);
          });
        } else {
          reject(new Error(`Failed to load sound: ${request.statusText}`));
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to load sound: ${request.statusText}`));
      };

      request.send();
    });
  }

  // Plays a sound from the sounds map
  playSound(key: string): void {
    const sound = this.sounds.get(key);
    if (!sound) {
      console.warn(`Audio buffer for key '${key}' not found.`);
      return;
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = sound;
    source.connect(this.audioContext.destination);
    source.start(0);
  }

  // Stops all sounds
  stopAllSounds(): void {
    this.sounds.forEach((sound, key) => {
      const source = this.audioContext.createBufferSource();
      source.buffer = sound;
      source.stop(0);
    });
  }
}
