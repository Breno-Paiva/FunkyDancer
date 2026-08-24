# autochart

Generates a first-draft chart (note timings + lanes) from an audio file
using onset detection, so a new song doesn't start from a blank array.
It's a draft aid, not a substitute for listening and adjusting by ear —
always play the result back before shipping a chart.

## Setup (one-time)

```
cd modern/tools/autochart
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
```

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

Tune `--min-gap` (default 0.3s) if the draft comes out too dense or too
sparse relative to the song's actual tempo.
