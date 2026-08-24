import Phaser from 'phaser';
import { Theme } from '../theme';
import { createMuteButton } from '../ui/muteButton';
import { CHARTS } from '../charts';

const CARD_COLORS = [Theme.pink, Theme.blue, Theme.yellow, Theme.green];
const CARD_WIDTH = 220;
const CARD_GAP = 24;

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

    const spacing = CARD_WIDTH + CARD_GAP;
    const totalWidth = CHARTS.length * CARD_WIDTH + (CHARTS.length - 1) * CARD_GAP;
    const startX = 400 - totalWidth / 2 + CARD_WIDTH / 2;

    CHARTS.forEach((chart, i) => {
      this.buildSongCard(startX + i * spacing, 300, {
        title: chart.title,
        subtitle: `${chart.notes.length} notes`,
        color: CARD_COLORS[i % CARD_COLORS.length],
        onSelect: () => this.scene.start('gameplay', { chartId: chart.id }),
      });
    });
  }

  private buildSongCard(
    x: number,
    y: number,
    opts: { title: string; subtitle: string; color: number; onSelect: () => void },
  ): void {
    const card = this.add.rectangle(x, y, CARD_WIDTH, 140, 0x2a3d40, 0.7);
    card.setStrokeStyle(3, opts.color, 1);

    this.add
      .text(x, y - 20, opts.title, {
        fontFamily: 'Georgia, serif',
        fontSize: '26px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(x, y + 24, opts.subtitle, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '13px',
        color: '#ffd265',
      })
      .setOrigin(0.5);

    card.setInteractive({ useHandCursor: true });
    card.on('pointerover', () => card.setFillStyle(0x2a3d40, 0.9));
    card.on('pointerout', () => card.setFillStyle(0x2a3d40, 0.7));
    card.on('pointerdown', opts.onSelect);
  }
}
