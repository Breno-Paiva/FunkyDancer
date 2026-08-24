import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene';
import { GameplayScene } from './scenes/GameplayScene';
import { ResultsScene } from './scenes/ResultsScene';
import { Theme } from './theme';

// Two logical resolutions - landscape (wide, short) and portrait
// (narrow, tall). Every scene lays itself out proportionally to
// `this.scale.width/height`, so either works without a separate
// portrait-specific layout branch in scene code.
const LANDSCAPE_SIZE = { width: 800, height: 500 };
const PORTRAIT_SIZE = { width: 450, height: 800 };

function isPortrait(): boolean {
  return window.innerWidth < window.innerHeight;
}

const initialSize = isPortrait() ? PORTRAIT_SIZE : LANDSCAPE_SIZE;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: initialSize.width,
  height: initialSize.height,
  backgroundColor: Theme.body,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    activePointers: 4, // one per lane, so chords/near-simultaneous taps all register
  },
  scene: [MenuScene, GameplayScene, ResultsScene],
};

const game = new Phaser.Game(config);

// Re-layout on an actual orientation flip (not every minor viewport
// jiggle, e.g. mobile Safari's address bar show/hide). Only the menu
// restarts itself live - it has no per-run state to lose. Gameplay and
// results are deliberately left alone (reflowing gameplay mid-song
// would lose progress, and results has no captured data to replay
// through a restart); the new size just takes effect the next time
// those scenes are freshly entered.
let lastPortrait = isPortrait();
window.addEventListener('resize', () => {
  const nowPortrait = isPortrait();
  if (nowPortrait === lastPortrait) return;
  lastPortrait = nowPortrait;

  const size = nowPortrait ? PORTRAIT_SIZE : LANDSCAPE_SIZE;
  game.scale.resize(size.width, size.height);

  const active = game.scene.getScenes(true)[0];
  if (active && active.scene.key === 'menu') {
    active.scene.restart();
  }
});
