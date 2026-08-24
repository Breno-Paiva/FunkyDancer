import Phaser from 'phaser';
import { Theme } from '../theme';
import { createMuteButton } from '../ui/muteButton';
import { CHARTS } from '../charts';

const CARD_COLORS = [Theme.pink, Theme.blue, Theme.yellow, Theme.green];
const CARD_HEIGHT = 140;
const CARD_GAP = 24;
const SIDE_MARGIN = 40;
const MAX_CARD_WIDTH = 220;

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  create(): void {
    const w = this.scale.width;
    const h = this.scale.height;

    this.cameras.main.setBackgroundColor(Theme.body);

    this.add
      .text(w / 2, h * 0.1, 'FUNKY DANCER', {
        fontFamily: 'Georgia, serif',
        fontSize: '44px',
        color: '#ffffff',
        stroke: '#bcff7c',
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.add
      .text(w / 2, h * 0.18, 'Modern Edition — in development', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    createMuteButton(this, w - 20, 16);

    this.layoutSongCards(w, h);
  }

  private layoutSongCards(w: number, h: number): void {
    const availableWidth = w - SIDE_MARGIN * 2;
    const cardsPerRow = Math.max(1, Math.floor((availableWidth + CARD_GAP) / (MAX_CARD_WIDTH + CARD_GAP)));
    const cardWidth =
      cardsPerRow === 1
        ? Math.min(availableWidth, MAX_CARD_WIDTH * 1.3)
        : (availableWidth - (cardsPerRow - 1) * CARD_GAP) / cardsPerRow;
    const rows = Math.ceil(CHARTS.length / cardsPerRow);
    const gridHeight = rows * CARD_HEIGHT + (rows - 1) * CARD_GAP;

    const contentTop = h * 0.26;
    const contentBottom = h * 0.96;
    const startY = contentTop + Math.max(0, (contentBottom - contentTop - gridHeight) / 2) + CARD_HEIGHT / 2;

    const rowWidth = cardsPerRow * cardWidth + (cardsPerRow - 1) * CARD_GAP;
    const startX = w / 2 - rowWidth / 2 + cardWidth / 2;

    CHARTS.forEach((chart, i) => {
      const col = i % cardsPerRow;
      const row = Math.floor(i / cardsPerRow);
      const x = startX + col * (cardWidth + CARD_GAP);
      const y = startY + row * (CARD_HEIGHT + CARD_GAP);

      this.buildSongCard(x, y, cardWidth, {
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
    width: number,
    opts: { title: string; subtitle: string; color: number; onSelect: () => void },
  ): void {
    const card = this.add.rectangle(x, y, width, CARD_HEIGHT, 0x2a3d40, 0.7);
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
