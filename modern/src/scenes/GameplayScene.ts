import Phaser from 'phaser';
import { Theme } from '../theme';
import { LANES, laneConfig } from '../lanes';
import { catzChart } from '../charts/catz';
import type { Chart, ChartNote, Lane } from '../charts/types';
import type { GameStats } from '../types';
import { createMuteButton } from '../ui/muteButton';

const SPAWN_Y = 40;
const HIT_Y = 430;
const PERFECT_WINDOW = 0.06;
const GOOD_WINDOW = 0.14;
const PERFECT_SCORE = 100;
const GOOD_SCORE = 50;
const MULTIPLIER_STEP = 10;
const MULTIPLIER_CAP = 5;
const FUNKY_MILESTONE = 10;

type HitResult = 'perfect' | 'good' | 'miss';

interface RuntimeNote extends ChartNote {
  resolved: boolean;
  spawned: boolean;
  sprite?: Phaser.GameObjects.Arc;
}

type PlayState = 'counting' | 'playing' | 'ended';

export class GameplayScene extends Phaser.Scene {
  private chart: Chart = catzChart;
  private state: PlayState = 'counting';

  private runtimeNotes: RuntimeNote[] = [];
  private laneQueues: Record<Lane, RuntimeNote[]> = { 1: [], 2: [], 3: [], 4: [] };
  private laneCursor: Record<Lane, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  private targetMarkers: Record<Lane, Phaser.GameObjects.Arc> = {} as Record<Lane, Phaser.GameObjects.Arc>;

  private score = 0;
  private combo = 0;
  private maxCombo = 0;
  private perfectCount = 0;
  private goodCount = 0;
  private missCount = 0;

  private scoreText!: Phaser.GameObjects.Text;
  private comboText!: Phaser.GameObjects.Text;
  private countdownText!: Phaser.GameObjects.Text;
  private funkyBanner!: Phaser.GameObjects.Text;
  private dancer!: Phaser.GameObjects.Sprite;
  private hitParticles!: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor() {
    super('gameplay');
  }

  preload(): void {
    this.load.audio(this.chart.audioKey, this.chart.audioPath);
    this.load.spritesheet('dancer', 'sprites/dancer_sheet.png', {
      frameWidth: 110,
      frameHeight: 128,
    });
  }

  create(): void {
    this.cameras.main.setBackgroundColor(Theme.body);
    this.resetRunState();
    this.buildAnimations();
    this.buildParticles();
    this.buildLaneVisuals();
    this.buildDancer();
    this.buildHud();
    this.buildCountdownText();
    this.bindInput();
    createMuteButton(this, 780, 470);

    this.startCountdown();

    if (new URLSearchParams(location.search).has('debug')) {
      (window as unknown as { __scene: GameplayScene }).__scene = this;
    }
  }

  private buildParticles(): void {
    if (!this.textures.exists('particle')) {
      const g = this.add.graphics();
      g.fillStyle(0xffffff, 1);
      g.fillCircle(4, 4, 4);
      g.generateTexture('particle', 8, 8);
      g.destroy();
    }
    this.hitParticles = this.add.particles(0, 0, 'particle', {
      lifespan: 350,
      speed: { min: 60, max: 180 },
      scale: { start: 1, end: 0 },
      quantity: 10,
      emitting: false,
    });
  }

  private resetRunState(): void {
    this.runtimeNotes = this.chart.notes.map((n) => ({ ...n, resolved: false, spawned: false }));
    this.laneQueues = { 1: [], 2: [], 3: [], 4: [] };
    for (const note of this.runtimeNotes) this.laneQueues[note.lane].push(note);
    this.laneCursor = { 1: 0, 2: 0, 3: 0, 4: 0 };
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.perfectCount = 0;
    this.goodCount = 0;
    this.missCount = 0;
  }

  private buildAnimations(): void {
    const define = (key: string, start: number, end: number, repeat: number) => {
      if (!this.anims.exists(key)) {
        this.anims.create({
          key,
          frames: this.anims.generateFrameNumbers('dancer', { start, end }),
          frameRate: 12,
          repeat,
        });
      }
    };
    define('waiting', 0, 7, -1);
    define('slap', 32, 35, 0);
    define('spin', 48, 55, 0);
    define('go', 56, 61, 0);
    define('zen', 72, 79, 0);
  }

  private buildLaneVisuals(): void {
    const bar = this.add.rectangle(400, HIT_Y, 560, 60, 0x2a3d40, 0.5);
    bar.setStrokeStyle(2, Theme.green, 0.6);

    for (const cfg of LANES) {
      const marker = this.add.circle(cfg.x, HIT_Y, 26, cfg.color, 0.35);
      marker.setStrokeStyle(3, cfg.color, 1);
      this.targetMarkers[cfg.lane] = marker;

      this.add
        .text(cfg.x, HIT_Y, cfg.label === 'SEMICOLON' ? ';' : cfg.label, {
          fontFamily: 'Georgia, serif',
          fontSize: '20px',
          color: '#ffffff',
        })
        .setOrigin(0.5);
    }
  }

  private buildDancer(): void {
    this.dancer = this.add.sprite(140, 300, 'dancer').setScale(1.2);
    this.dancer.play('waiting');
  }

  private buildHud(): void {
    this.scoreText = this.add.text(780, 16, 'Score: 0', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(1, 0);

    this.comboText = this.add.text(400, 16, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: '#ffd265',
    }).setOrigin(0.5, 0);
  }

  private buildCountdownText(): void {
    this.countdownText = this.add
      .text(400, 250, '', {
        fontFamily: 'Georgia, serif',
        fontSize: '64px',
        color: '#ffffff',
        stroke: '#c568a5',
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    this.funkyBanner = this.add
      .text(400, 180, 'FUNKY!', {
        fontFamily: 'Georgia, serif',
        fontSize: '48px',
        color: '#ffd265',
        stroke: '#c568a5',
        strokeThickness: 6,
      })
      .setOrigin(0.5)
      .setAlpha(0);
  }

  private bindInput(): void {
    for (const cfg of LANES) {
      this.input.keyboard?.on(`keydown-${cfg.key}`, () => this.handleKeyPress(cfg.lane));
    }
  }

  private handleKeyPress(lane: Lane): void {
    if (this.state !== 'playing') return;

    const queue = this.laneQueues[lane];
    const note = queue[this.laneCursor[lane]];
    if (!note || note.resolved) return; // no note pending in this lane - ignore, no penalty

    const audioTime = this.currentAudioTime();
    const offset = Math.abs(audioTime - note.time);
    if (offset > GOOD_WINDOW) return; // pressed too early/stray - ignore, no penalty

    const tier: HitResult = offset <= PERFECT_WINDOW ? 'perfect' : 'good';
    this.resolveNote(note, tier);
  }

  private startCountdown(): void {
    this.state = 'counting';

    const steps = ['3', '2', '1', 'GO!'];
    steps.forEach((label, i) => {
      this.time.delayedCall(i * 700, () => this.countdownText.setText(label));
    });
    this.time.delayedCall(steps.length * 700, () => {
      this.countdownText.setText('');
      this.beginSong();
    });
  }

  private beginSong(): void {
    this.state = 'playing';
    const sound = this.sound.add(this.chart.audioKey);
    sound.play();
    sound.once(Phaser.Sound.Events.COMPLETE, () => this.endSong());
  }

  private currentAudioTime(): number {
    const sound = this.sound.get(this.chart.audioKey) as Phaser.Sound.WebAudioSound | undefined;
    return sound?.seek ?? 0;
  }

  update(): void {
    if (this.state !== 'playing') return;

    const audioTime = this.currentAudioTime();

    for (const note of this.runtimeNotes) {
      if (note.resolved) continue;

      if (!note.spawned && audioTime >= note.time - this.chart.leadTime) {
        note.spawned = true;
        const cfg = laneConfig(note.lane);
        note.sprite = this.add.circle(cfg.x, SPAWN_Y, 22, cfg.color);
      }

      if (note.spawned && note.sprite) {
        const progress = (audioTime - (note.time - this.chart.leadTime)) / this.chart.leadTime;
        note.sprite.y = Phaser.Math.Linear(SPAWN_Y, HIT_Y, Phaser.Math.Clamp(progress, 0, 1));

        if (audioTime > note.time + GOOD_WINDOW) {
          this.resolveNote(note, 'miss');
        }
      }
    }
  }

  private resolveNote(note: RuntimeNote, tier: HitResult): void {
    note.resolved = true;
    this.laneCursor[note.lane]++;

    if (note.sprite) {
      note.sprite.destroy();
      note.sprite = undefined;
    }

    const cfg = laneConfig(note.lane);
    this.flashMarker(cfg.lane, tier === 'miss' ? 0xff5b5b : cfg.color);
    this.showTierPopup(cfg.x, tier);

    if (tier === 'miss') {
      this.missCount++;
      this.combo = 0;
      this.dancer.play('waiting');
    } else {
      this.hitParticles.setParticleTint(cfg.color);
      this.hitParticles.explode(10, cfg.x, HIT_Y);

      const multiplier = Math.min(1 + Math.floor(this.combo / MULTIPLIER_STEP), MULTIPLIER_CAP);
      this.score += (tier === 'perfect' ? PERFECT_SCORE : GOOD_SCORE) * multiplier;
      this.combo++;
      this.maxCombo = Math.max(this.maxCombo, this.combo);
      if (tier === 'perfect') this.perfectCount++;
      else this.goodCount++;
      this.dancer.play(cfg.danceAnim);
      this.dancer.once('animationcomplete', () => this.dancer.play('waiting'));

      if (this.combo > 0 && this.combo % FUNKY_MILESTONE === 0) this.showFunkyBanner();
    }

    this.scoreText.setText(`Score: ${this.score}`);
    this.comboText.setText(this.combo > 1 ? `Combo x${this.combo}` : '');
  }

  private showTierPopup(x: number, tier: HitResult): void {
    const label = tier === 'perfect' ? 'PERFECT' : tier === 'good' ? 'GOOD' : 'MISS';
    const color = tier === 'miss' ? '#ff5b5b' : '#ffffff';
    const popup = this.add
      .text(x, HIT_Y - 40, label, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color,
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: popup,
      y: HIT_Y - 80,
      alpha: 0,
      duration: 500,
      onComplete: () => popup.destroy(),
    });
  }

  private showFunkyBanner(): void {
    this.funkyBanner.setAlpha(1).setScale(0.7);
    this.tweens.add({
      targets: this.funkyBanner,
      scale: 1,
      duration: 200,
      ease: 'Back.Out',
    });
    this.tweens.add({
      targets: this.funkyBanner,
      alpha: 0,
      delay: 500,
      duration: 400,
    });
  }

  private flashMarker(lane: Lane, color: number): void {
    const marker = this.targetMarkers[lane];
    marker.setFillStyle(color, 0.8);
    this.tweens.add({
      targets: marker,
      duration: 150,
      onComplete: () => marker.setFillStyle(laneConfig(lane).color, 0.35),
    });
  }

  private endSong(): void {
    this.state = 'ended';
    const stats: GameStats = {
      chartTitle: this.chart.title,
      score: this.score,
      perfectCount: this.perfectCount,
      goodCount: this.goodCount,
      missCount: this.missCount,
      totalNotes: this.chart.notes.length,
      maxCombo: this.maxCombo,
    };
    this.time.delayedCall(400, () => this.scene.start('results', stats));
  }
}
