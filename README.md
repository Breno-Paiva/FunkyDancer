## Funky Dancer

[Live link][Funkydancer] is a music rhythm game reminiscent of guitar hero and dance dance revolution.  The user selects the song they want to play and music notes corresponding to dance moves start scrolling down the screen.  The user then has to strike to correct note as they reach the bottom.  The user's correct note streak is tracked and if they hit 10 notes in a row they are awarded funky status.

#### Game Mechanics

to play use the keys: "j", "k", "l", ";"

The music notes are stored in an array of objects containing which note needs to be hit and at what time.

```js
//js
1: [
  {time: 1.65, noteID: 1},
  {time: 2.2, noteID: 2},
  {time: 2.75, noteID: 1},
  {time: 3.3, noteID: 2},
  {time: 3.85, noteID: 1},
  {time: 4.125, noteID: 1},
  .
  .
  .
  {time: 12.6, noteID: 2},
  {time: 13.15, noteID: 1},
  {time: 14.25, noteID: 1},
  {time: 14.8, noteID: 2},
  {time: 15.35, noteID: 1},
  {time: 16.45, noteID: 3},
  {time: 17, noteID: 3},
]
```

The notes are rendered on the screen one second before they are played; the amount of time for the note to make its way down the screen.

#### Feedback

The user receives feedback as they play through a song:

At the beginning and end of a song, the MC talks to the user.
When a wrong note is hit, they are told "NO".
If a 10 point streak is achieved, funky status is reached and displayed.

[funkydancer]: https://friskyb.github.io/FunkyDancer/
