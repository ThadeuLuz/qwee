interface MelodyNote {
  duration: number;
  frequency: number;
}

interface ParsedRtttl {
  name: string;
  defaults: {
    duration: string;
    octave: string;
    bpm: string;
  };
  melody: MelodyNote[];
}

export function getData(melody: any, defaults: any): any;
export function getDefaults(defaults: any): any;
export function getName(name: any): any;
export function parse(rtttl: string): ParsedRtttl;
