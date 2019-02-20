// Based on https://github.com/nochecksum/rpio-rtttl-piezo/blob/master/dist/index.js
import rpio from "rpio";
import { parse } from "rtttl-parse";
import pins from "../helpers/pins";

export type RtttlName = "startup" | "backToTheFuture" | "ghostBuster";
type Rtttl = string;

// Play here: https://adamonsoon.github.io/rtttl-play/
const rtttls: Record<string, Rtttl> = {
  startup: "Default:d=16,o=6,b=200:d,d#,e,f,f#",
  backToTheFuture:
    "Back to the Future:d=16,o=5,b=200:4g.,p,4c.,p,2f#.,p,g.,p,a.,p,8g,p,8e,p,8c,p,4f#,p,g.,p,a.,p,8g.,p,8d.,p,8g.,p,8d.6,p,4d.6,p,4c#6,p,b.,p,c#.6,p,2d.6",
  ghostBuster:
    "Ghostbus:d=16,o=5,b=112:g,g,8b,8g,8a,4f.,g,g,g,g,8f,4g.,g,g,8b,8g,8a,4f.,g,g,g,g,8f,8a,8g,4d.,g,g,8b,8g,8a,4f.,g,g,g,g,8f,4g."
};

rpio.init({
  gpiomem: false,
  mapping: "physical"
});

class Buzzer {
  public rpioPin: number;
  public pwmClockDivider = 16;
  public pwmClockFreq = 1.2e6;
  public dutyCycle = 2; // Volume
  public freqMultiplier = 3;
  public noteCounter = 0;
  public tune = parse(rtttls.startup);
  public isPlaying: boolean;

  constructor(pin = pins.buzzer) {
    // Convert J5 pins ("P1-12") to rpio ("P12") pins
    // this.rpioPin = `P${pin.split("-")[1]}`;
    this.rpioPin = 12;
    // this.rpioPin = 12;
    // @ts-ignore
    rpio.open(this.rpioPin, rpio.PWM);
    rpio.pwmSetClockDivider(this.pwmClockDivider);
  }

  public play = (rttlName: RtttlName) => {
    console.log(`Playing ${rttlName}`);
    // Parse RTTTL to playable notes
    this.tune = parse(rtttls[rttlName]);
    this.noteCounter = 0;

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.playNextNote();
    }
  };

  public playNote = (frequency = 0) => {
    console.log(`Setting frequency: ${frequency}`);
    // Avoid divide by 0
    if (frequency !== 0) {
      const freq = frequency * this.freqMultiplier;

      // Set PWM range based on clock frequency,
      // @ts-ignore
      rpio.pwmSetRange(this.rpioPin, this.pwmClockFreq / freq);

      // and PWM data based on duty cycle
      // @ts-ignore
      rpio.pwmSetData(this.rpioPin, this.pwmClockFreq / freq / this.dutyCycle);
    } else {
      // @ts-ignore
      rpio.pwmSetData(this.rpioPin, 0);
    }
  };

  public playNextNote = () => {
    const note = (this.tune.melody || [])[this.noteCounter];
    this.noteCounter = this.noteCounter + 1;

    if (!note) {
      this.isPlaying = false;
      this.playNote(0); // silence.
      return;
    }

    const { frequency, duration } = note;
    this.playNote(frequency);

    // Prepare for next note in melody sequence
    setTimeout(() => {
      this.playNextNote();
    }, duration);
  };
}

export default Buzzer;

export const test = () => {
  const b = new Buzzer();
  b.play("ghostBuster");
};