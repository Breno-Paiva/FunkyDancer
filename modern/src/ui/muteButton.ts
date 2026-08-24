import Phaser from 'phaser';
import { loadMutedPref, saveMutedPref } from '../soundPrefs';

// Small clickable "Sound: On/Off" label, wired to the scene's sound
// manager and persisted to localStorage. Sound Manager is shared
// across the whole Game instance, so applying the stored pref once
// per scene create() keeps every scene in sync.
export function createMuteButton(scene: Phaser.Scene, x: number, y: number): Phaser.GameObjects.Text {
  scene.sound.mute = loadMutedPref();

  const label = () => `Sound: ${scene.sound.mute ? 'Off' : 'On'}`;

  const button = scene.add
    .text(x, y, label(), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#2a3d4080',
      padding: { x: 8, y: 4 },
    })
    .setOrigin(1, 0)
    .setInteractive({ useHandCursor: true });

  button.on('pointerdown', () => {
    scene.sound.mute = !scene.sound.mute;
    saveMutedPref(scene.sound.mute);
    button.setText(label());
  });

  return button;
}
