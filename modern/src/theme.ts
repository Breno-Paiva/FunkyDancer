// Neutral placeholder palette - the dancer sprite and background art were
// pulled out to make room for real replacements later (see
// docs/modern-version-plan.md). `body` is a dark neutral backdrop rather
// than art; `bodyHot` is what the gameplay background blends toward as a
// hit streak builds, via GameplayScene's combo bar. Lane colors stay
// vivid and are paired with a distinct shape per lane so they read
// without relying on color alone.
export const Theme = {
  body: 0x1b1f24,
  bodyHot: 0x3a1f33,
  green: 0x7dffb0,
  pink: 0xff5fa8,
  yellow: 0xffd23f,
  blue: 0x4fd8ff,
} as const;
