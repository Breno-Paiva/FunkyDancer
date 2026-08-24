import Phaser from 'phaser';
import { Theme } from '../theme';
import type { GameStats } from '../types';

function gradeFor(accuracy: number): string {
  if (accuracy >= 95) return 'S';
  if (accuracy >= 85) return 'A';
  if (accuracy >= 70) return 'B';
  if (accuracy >= 50) return 'C';
  return 'D';
}

export class ResultsScene extends Phaser.Scene {
  constructor() {
    super('results');
  }

  create(stats: GameStats): void {
    this.cameras.main.setBackgroundColor(Theme.body);

    const accuracy = stats.totalNotes > 0
      ? ((stats.perfectCount + stats.goodCount) / stats.totalNotes) * 100
      : 0;
    const grade = gradeFor(accuracy);

    this.add
      .text(400, 60, stats.chartTitle, {
        fontFamily: 'Georgia, serif',
        fontSize: '28px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 150, grade, {
        fontFamily: 'Georgia, serif',
        fontSize: '96px',
        color: '#ffffff',
        stroke: '#bcff7c',
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    const lines = [
      `Score: ${stats.score}`,
      `Accuracy: ${accuracy.toFixed(1)}%`,
      `Max Combo: ${stats.maxCombo}`,
      `Perfect: ${stats.perfectCount}  Good: ${stats.goodCount}  Miss: ${stats.missCount}`,
    ];

    this.add
      .text(400, 290, lines.join('\n'), {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 10,
      })
      .setOrigin(0.5, 0);

    const retry = this.add
      .text(400, 440, 'Press any key to return to the menu', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#ffd265',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: retry,
      alpha: 0.3,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    this.input.keyboard?.once('keydown', () => this.scene.start('menu'));
  }
}
