type Tune =
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
  | "c6"
  | null;

type Note = [Tune, number];

type Song = Note[];

interface ISong {
  song: Song;
  tempo: number;
}

export const songs: Record<string, ISong> = {
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
