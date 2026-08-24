#!/usr/bin/env python3
"""Generate a first-draft chart from an audio file via onset detection.

This is a draft aid, not a replacement for charting by ear (see
docs/modern-version-plan.md - Non-Goals). It gets note *timing* roughly
right and gives each note a plausible lane, but the output should always
be played back and adjusted by hand before shipping.

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

import librosa
import numpy as np


def detect_notes(audio_path: str, min_gap: float) -> list[dict]:
    y, sr = librosa.load(audio_path, sr=None, mono=True)
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    onset_frames = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr, backtrack=True)
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)
    strengths = onset_env[onset_frames]

    # Drop onsets closer together than min_gap so the chart is playable,
    # not a wall of notes - keep the stronger of any two that collide.
    kept_times: list[float] = []
    kept_strengths: list[float] = []
    for t, s in sorted(zip(onset_times, strengths), key=lambda pair: pair[0]):
        if kept_times and t - kept_times[-1] < min_gap:
            if s > kept_strengths[-1]:
                kept_times[-1] = t
                kept_strengths[-1] = s
            continue
        kept_times.append(t)
        kept_strengths.append(s)

    if not kept_strengths:
        return []

    # Map onset strength to lane, biased toward the 1/2/3/4 distribution
    # Classic's hand-charted songs actually use (lanes 1-2 dominant,
    # lane 3 occasional, lane 4 rare) rather than a flat round-robin,
    # which reads as more musical/intentional.
    hi = float(np.percentile(kept_strengths, 90))
    mid = float(np.percentile(kept_strengths, 70))

    notes = []
    for i, (t, s) in enumerate(zip(kept_times, kept_strengths)):
        if s >= hi:
            lane = 4
        elif s >= mid:
            lane = 3
        else:
            lane = 1 if i % 2 == 0 else 2
        notes.append({"time": round(float(t), 3), "lane": lane})

    return notes


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--audio", required=True, help="path to the source audio file")
    parser.add_argument("--id", required=True, help="chart id / audioKey, e.g. laVemKiko")
    parser.add_argument("--title", required=True, help="display title, e.g. 'La Vem Kiko'")
    parser.add_argument("--audio-path", required=True, help="audioPath as loaded by the game, e.g. audio/laVemKiko.mp3")
    parser.add_argument("--min-gap", type=float, default=0.3, help="minimum seconds between notes")
    parser.add_argument("--lead-time", type=float, default=1.5)
    parser.add_argument("--out", required=True, help="output chart JSON path")
    args = parser.parse_args()

    notes = detect_notes(args.audio, args.min_gap)
    chart = {
        "id": args.id,
        "title": args.title,
        "audioKey": args.id,
        "audioPath": args.audio_path,
        "leadTime": args.lead_time,
        "notes": notes,
    }

    with open(args.out, "w") as f:
        json.dump(chart, f, indent=2)
        f.write("\n")

    print(f"Wrote {len(notes)} notes to {args.out}")


if __name__ == "__main__":
    main()
