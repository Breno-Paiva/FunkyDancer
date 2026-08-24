# autochart

Generates a first-draft chart from an audio file — two difficulties in
one JSON file, so a new song doesn't start from a blank array:

- **fun**: sparse, quantized to the beat grid, 2 lanes only — a
  beginner on-ramp.
- **funky**: dense, timed to actual onsets across all 4 lanes, lane
  choice informed by onset strength + spectral brightness.

It's a draft aid, not a substitute for listening and adjusting by ear —
always play the result back before shipping a chart.

## Setup (one-time)

```
cd modern/tools/autochart
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
```

Requires `ffmpeg` on PATH (used to decode any input format to a
consistent mono WAV before analysis — handles `.m4a`, which
librosa/soundfile can't read directly).

## Run

```
.venv/bin/python autochart.py \
  --audio /path/to/song.mp3 \
  --id someSong \
  --title "Some Song" \
  --audio-path audio/someSong.mp3 \
  --out ../../src/charts/someSong.json
```

`--audio-path` is the path the game will load the audio from at runtime
(relative to `modern/public/`) — copy the audio file there yourself,
this script only writes the chart JSON.

Tune `--min-gap` (default 0.3s) if the funky draft comes out too dense
or too sparse relative to the song's actual tempo. The fun chart's
spacing is tempo-normalized automatically (`FUN_TARGET_SPACING` in
`autochart.py`), not exposed as a flag.
