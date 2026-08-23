import Phaser from 'phaser';
import { Theme } from '../theme';

// First scene of the rewrite: proves the Phaser/Vite pipeline works
// end to end. Real game states (menu, song select, gameplay, results)
// replace this as the plan's later phases land.
export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  create(): void {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor(Theme.body);

    this.add
      .text(width / 2, height / 2 - 30, 'FUNKY DANCER', {
        fontFamily: 'Georgia, serif',
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#bcff7c',
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 30, 'Modern Edition — in development', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
  }
}
