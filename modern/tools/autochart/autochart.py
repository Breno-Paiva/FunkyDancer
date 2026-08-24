#!/usr/bin/env python3
"""Generate a first-draft two-difficulty chart from an audio file.

This is a draft aid, not a replacement for charting by ear (see
docs/modern-version-plan.md - Non-Goals). It gets note *timing* roughly
right and gives each note a plausible lane, but the output should always
be played back and adjusted by hand before shipping.

Produces two difficulties in one chart file:
  - "fun":   sparse, quantized to the beat grid, 2 lanes only - readable
             for a first-time player.
  - "funky": the full onset-detected chart across all 4 lanes.

Usage:
    .venv/bin/python autochart.py \
        --audio /path/to/song.mp3 \
        --id laVemKiko \
        --title "La Vem Kiko" \
        --audio-path audio/laVemKiko.mp3 \
        --out ../../src/charts/laVemKiko.json
"""
import argparse
import json
import os
import subprocess
import tempfile

import librosa
import numpy as np


def load_mono(audio_path: str) -> tuple[np.ndarray, int]:
    """Decode any input format to mono 44.1kHz via ffmpeg first.

    librosa/soundfile can't read .m4a directly (no bundled AAC decoder),
    so route every input through ffmpeg for one consistent, format-agnostic
    load path instead of special-casing formats.
    """
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp:
        tmp_path = tmp.name
    try:
        subprocess.run(
            ['ffmpeg', '-y', '-i', audio_path, '-ac', '1', '-ar', '44100', tmp_path],
            check=True, capture_output=True,
        )
        return librosa.load(tmp_path, sr=None, mono=True)
    finally:
        os.unlink(tmp_path)


def analyze(y: np.ndarray, sr: int):
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    onset_frames = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr, backtrack=True)
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)
    strengths = onset_env[onset_frames]

    # Spectral centroid ("brightness") at each onset, to inform lane choice
    # alongside raw strength - a bright/high hit and a dull/low hit at the
    # same strength should still land differently.
    centroid = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
    centroid_frames = np.clip(onset_frames, 0, len(centroid) - 1)
    brightness = centroid[centroid_frames]

    tempo, beat_frames = librosa.beat.beat_track(onset_envelope=onset_env, sr=sr)
    tempo = float(np.atleast_1d(tempo)[0])
    beat_times = librosa.frames_to_time(beat_frames, sr=sr)

    return onset_times, strengths, brightness, tempo, beat_times


def build_funky(onset_times, strengths, brightness, min_gap: float) -> list[dict]:
    """Dense chart across all 4 lanes, timed to actual onsets."""
    order = np.argsort(onset_times)
    onset_times, strengths, brightness = onset_times[order], strengths[order], brightness[order]

    # Collapse onsets closer together than min_gap so the chart stays
    # playable, not a wall of notes - keep the stronger of any two that
    # collide.
    kept_t: list[float] = []
    kept_s: list[float] = []
    kept_b: list[float] = []
    for t, s, b in zip(onset_times, strengths, brightness):
        if kept_t and t - kept_t[-1] < min_gap:
            if s > kept_s[-1]:
                kept_t[-1], kept_s[-1], kept_b[-1] = t, s, b
            continue
        kept_t.append(t)
        kept_s.append(s)
        kept_b.append(b)

    if not kept_s:
        return []

    hi = float(np.percentile(kept_s, 90))
    mid = float(np.percentile(kept_s, 70))
    bright_median = float(np.median(kept_b))

    notes: list[dict] = []
    recent: list[int] = []
    for t, s, b in zip(kept_t, kept_s, kept_b):
        if s >= hi:
            lane = 4
        elif s >= mid:
            lane = 3
        else:
            # Below the "big hit" bands - pick 1 or 2 by how bright the
            # onset is, rather than blindly alternating on index parity.
            lane = 2 if b >= bright_median else 1

        # Avoid three-in-a-row on the same lane - it reads as a stuck key,
        # not a musical run. Nudge to the next lane over instead.
        if len(recent) >= 2 and recent[-1] == lane and recent[-2] == lane:
            lane = (lane % 4) + 1

        notes.append({"time": round(float(t), 3), "lane": lane})
        recent.append(lane)

    return notes


FUN_TARGET_SPACING = 0.85  # seconds between notes we're aiming for, any tempo


def build_fun(beat_times, tempo: float) -> list[dict]:
    """Sparse, on-the-beat chart using only 2 lanes - a beginner on-ramp."""
    if len(beat_times) == 0:
        return []

    # Step across beats (rather than using every one) so the note spacing
    # lands near FUN_TARGET_SPACING regardless of the song's tempo - a fast
    # song needs a bigger step than a slow one to read equally "easy".
    intervals = np.diff(beat_times)
    median_interval = float(np.median(intervals)) if len(intervals) else 0.5
    step = max(1, round(FUN_TARGET_SPACING / median_interval))

    notes: list[dict] = []
    for i, t in enumerate(beat_times[::step]):
        if t < 0.4:
            continue
        lane = 1 if i % 2 == 0 else 2
        notes.append({"time": round(float(t), 3), "lane": lane})

    return notes


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--audio", required=True, help="path to the source audio file")
    parser.add_argument("--id", required=True, help="chart id / audioKey, e.g. laVemKiko")
    parser.add_argument("--title", required=True, help="display title, e.g. 'La Vem Kiko'")
    parser.add_argument("--audio-path", required=True, help="audioPath as loaded by the game, e.g. audio/laVemKiko.mp3")
    parser.add_argument("--min-gap", type=float, default=0.3, help="minimum seconds between notes in the funky chart")
    parser.add_argument("--lead-time", type=float, default=1.5)
    parser.add_argument("--out", required=True, help="output chart JSON path")
    args = parser.parse_args()

    y, sr = load_mono(args.audio)
    onset_times, strengths, brightness, tempo, beat_times = analyze(y, sr)

    fun_notes = build_fun(beat_times, tempo)
    funky_notes = build_funky(onset_times, strengths, brightness, args.min_gap)

    chart = {
        "id": args.id,
        "title": args.title,
        "audioKey": args.id,
        "audioPath": args.audio_path,
        "leadTime": args.lead_time,
        "notes": {
            "fun": fun_notes,
            "funky": funky_notes,
        },
    }

    with open(args.out, "w") as f:
        json.dump(chart, f, indent=2)
        f.write("\n")

    print(f"tempo ~{tempo:.1f} BPM")
    print(f"Wrote {len(fun_notes)} fun notes + {len(funky_notes)} funky notes to {args.out}")


if __name__ == "__main__":
    main()
