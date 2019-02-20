type NonNullTune =
  | "c4"
  | "c#4"
  | "d4"
  | "d#4"
  | "e4"
  | "f4"
  | "f#4"
  | "g4"
  | "g#4"
  | "a4"
  | "a#4"
  | "b4"
  | "c5"
  | "c#5"
  | "d5"
  | "d#5"
  | "e5"
  | "f5"
  | "f#5"
  | "g5"
  | "g#5"
  | "a5"
  | "a#5"
  | "b5"
  | "c6";

type Tune = null | NonNullTune;

export const noteFrequency: Record<NonNullTune, number> = {
  c4: 262,
  "c#4": 277,
  d4: 294,
  "d#4": 311,
  e4: 330,
  f4: 349,
  "f#4": 370,
  g4: 392,
  "g#4": 415,
  a4: 440,
  "a#4": 466,
  b4: 494,
  c5: 523,
  "c#5": 554,
  d5: 587,
  "d#5": 622,
  e5: 659,
  f5: 698,
  "f#5": 740,
  g5: 784,
  "g#5": 831,
  a5: 880,
  "a#5": 932,
  b5: 988,
  c6: 1047
};

type Note = [Tune, number];

type Song = Note[];

interface IMelody {
  song: Song;
  tempo: number;
}

type MelodyNames = "startup";

export const melodies: Record<MelodyNames, IMelody> = {
  startup: {
    song: [
      ["f4", 1],
      ["g4", 1],
      ["a4", 1],
      ["c5", 1],
      [null, 1],
      ["a4", 1],
      ["c5", 6]
    ],
    tempo: 100
  }
};

type PlayFn = (frequency: number) => null;

export const playFrequency = async (
  play: PlayFn,
  frequency: number,
  duration: number
) => {
  play(frequency);
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
  play(frequency);
};

export const play = async (buzzer: any, songName: MelodyNames) => {
  // const { song, tempo } = melodies[songName];
  // const songPromise = song.reduce(
  //   (promise, [tune, duration]) =>
  //     promise.then(
  //       () =>
  //         new Promise(resolve => {
  //           const frequency = noteFrequency[tune];
  //           const totalDuration = tempo * duration;
  //           setTimeout(() => {
  //             resolve();
  //           }, totalDuration);
  //         })
  //     ),
  //   Promise.resolve()
  // );
};

// const eyeOpen = [
//   ["  00  ", "  00  "],
//   [" 0000 ", " 0000 "],
//   [" 0000 ", " 0000 "],
//   [" 0000 ", " 0000 "],
//   [" 0000 ", " 0000 "],
//   ["000000", "000000"],
//   [" 0000 ", " 0000 "],
//   ["  00  ", "  00  "]
// ];
