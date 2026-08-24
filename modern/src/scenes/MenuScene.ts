import Phaser from 'phaser';
import { Theme } from '../theme';
import { createMuteButton } from '../ui/muteButton';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  create(): void {
    this.cameras.main.setBackgroundColor(Theme.body);

    this.add
      .text(400, 60, 'FUNKY DANCER', {
        fontFamily: 'Georgia, serif',
        fontSize: '44px',
        color: '#ffffff',
        stroke: '#bcff7c',
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.add
      .text(400, 105, 'Modern Edition — in development', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    createMuteButton(this, 780, 16);

    this.buildSongCard(250, 300, {
      title: 'Catz',
      subtitle: 'Press J, K, L, ;',
      color: Theme.pink,
      enabled: true,
      onSelect: () => this.scene.start('gameplay'),
    });

    this.buildSongCard(550, 300, {
      title: '???',
      subtitle: 'More songs coming soon',
      color: Theme.blue,
      enabled: false,
    });
  }

  private buildSongCard(
    x: number,
    y: number,
    opts: { title: string; subtitle: string; color: number; enabled: boolean; onSelect?: () => void },
  ): void {
    const card = this.add.rectangle(x, y, 260, 140, 0x2a3d40, opts.enabled ? 0.7 : 0.35);
    card.setStrokeStyle(3, opts.color, opts.enabled ? 1 : 0.4);

    this.add
      .text(x, y - 20, opts.title, {
        fontFamily: 'Georgia, serif',
        fontSize: '28px',
        color: opts.enabled ? '#ffffff' : '#9fb0b3',
      })
      .setOrigin(0.5);

    this.add
      .text(x, y + 20, opts.subtitle, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '13px',
        color: opts.enabled ? '#ffd265' : '#7f9093',
      })
      .setOrigin(0.5);

    if (opts.enabled && opts.onSelect) {
      card.setInteractive({ useHandCursor: true });
      card.on('pointerover', () => card.setFillStyle(0x2a3d40, 0.9));
      card.on('pointerout', () => card.setFillStyle(0x2a3d40, 0.7));
      card.on('pointerdown', opts.onSelect);
      this.input.keyboard?.once('keydown-ENTER', opts.onSelect);
    }
  }
}
