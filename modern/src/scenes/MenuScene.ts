import Phaser from 'phaser';
import { Theme } from '../theme';
import { createMuteButton } from '../ui/muteButton';
import { CHARTS } from '../charts';
import type { Chart, Difficulty } from '../charts/types';

const CARD_COLORS = [Theme.pink, Theme.blue, Theme.yellow, Theme.green];
const CARD_HEIGHT = 168;
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

      this.buildSongCard(x, y, cardWidth, chart, CARD_COLORS[i % CARD_COLORS.length]);
    });
  }

  private buildSongCard(x: number, y: number, width: number, chart: Chart, accent: number): void {
    const top = y - CARD_HEIGHT / 2;

    const card = this.add.rectangle(x, y, width, CARD_HEIGHT, 0x2a3d40, 0.7);
    card.setStrokeStyle(3, accent, 1);

    this.add
      .text(x, top + 32, chart.title, {
        fontFamily: 'Georgia, serif',
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    const btnWidth = (width - 44) / 2;
    const btnY = top + CARD_HEIGHT - 44;

    this.buildDifficultyButton(x - btnWidth / 2 - 6, btnY, btnWidth, {
      label: 'FUN',
      subtitle: `${chart.notes.fun.length} notes`,
      color: Theme.blue,
      onSelect: () => this.startGame(chart.id, 'fun'),
    });

    this.buildDifficultyButton(x + btnWidth / 2 + 6, btnY, btnWidth, {
      label: 'FUNKY',
      subtitle: `${chart.notes.funky.length} notes`,
      color: accent,
      onSelect: () => this.startGame(chart.id, 'funky'),
    });
  }

  private buildDifficultyButton(
    x: number,
    y: number,
    width: number,
    opts: { label: string; subtitle: string; color: number; onSelect: () => void },
  ): void {
    const btn = this.add.rectangle(x, y, width, 64, 0x1b1f24, 0.85);
    btn.setStrokeStyle(2, opts.color, 1);

    this.add
      .text(x, y - 12, opts.label, {
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
        fontStyle: 'bold',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(x, y + 12, opts.subtitle, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        color: '#ffd265',
      })
      .setOrigin(0.5);

    btn.setInteractive({ useHandCursor: true });
    btn.on('pointerover', () => btn.setFillStyle(0x1b1f24, 1));
    btn.on('pointerout', () => btn.setFillStyle(0x1b1f24, 0.85));
    btn.on('pointerdown', opts.onSelect);
  }

  private startGame(chartId: string, difficulty: Difficulty): void {
    this.scene.start('gameplay', { chartId, difficulty });
  }
}
