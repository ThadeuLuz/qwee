// Usa Hardware PWM
// @ts-ignore
import { PWM } from "raspi-pwm";

import { parse } from "rtttl-parse";
import pins from "../helpers/pins";

export type RtttlName = "startup" | "backToTheFuture";
type Rtttl = string;

// Play here: https://adamonsoon.github.io/rtttl-play/
const rtttls: Record<RtttlName, Rtttl> = {
  startup: "Default:d=16,o=6,b=200:d,d#,e,f,f#",
  backToTheFuture:
    "Back to the Future:d=16,o=5,b=200:4g.,p,4c.,p,2f#.,p,g.,p,a.,p,8g,p,8e,p,8c,p,4f#,p,g.,p,a.,p,8g.,p,8d.,p,8g.,p,8d.6,p,4d.6,p,4c#6,p,b.,p,c#.6,p,2d.6"
};

class Buzzer {
  public pwmClockDivider = 16;
  public pwmClockFreq = 1.2e6;
  public dutyCycle = 2; // Volume
  public freqMultiplier = 3;
  public noteCounter = 0;
  public tune = parse(rtttls.startup);
  public isPlaying: boolean;
  public buzzer: PWM;

  constructor(pin = pins.buzzer) {
    this.buzzer = new PWM(pin);
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

  public setFreq = (frequency = 0) => {
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
      this.setFreq(0); // silence.
      return;
    }

    const { frequency, duration } = note;
    this.setFreq(frequency);

    // Prepare for next note in melody sequence
    setTimeout(() => {
      this.playNextNote();
    }, duration);
  };
}

export default Buzzer;

export const test = () => {
  const b = new Buzzer();
  b.play("backToTheFuture");
};
