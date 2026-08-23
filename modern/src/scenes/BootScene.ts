import Phaser from 'phaser';
import { Theme } from '../theme';

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

    const prompt = this.add
      .text(width / 2, height / 2 + 90, 'Click or press any key to play', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#ffd265',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: prompt,
      alpha: 0.3,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    this.input.keyboard?.once('keydown', () => this.scene.start('gameplay'));
    this.input.once('pointerdown', () => this.scene.start('gameplay'));
  }
}
