"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// Based on https://github.com/nochecksum/rpio-rtttl-piezo/blob/master/dist/index.js
var rpio_1 = __importDefault(require("rpio"));
var rtttl_parse_1 = require("rtttl-parse");
var pins_1 = __importDefault(require("../helpers/pins"));
// Play here: https://adamonsoon.github.io/rtttl-play/
var rtttls = {
    startup: "Startup:d=16,o=6,b=200:d,d#,e,f,f#",
    ops: "Ops:d=16,o=4,b=200:c,p,2c",
    yay: "Yay:d=16,o=4,b=200:f,g,a,c5,p,a,2c5",
    joystickFound: "Ops:d=16,o=4,b=150:f,g,a,c5,p,a,4c5",
    backToTheFuture: "Back to the Future:d=16,o=5,b=200:4g.,p,4c.,p,2f#.,p,g.,p,a.,p,8g,p,8e,p,8c,p,4f#,p,g.,p,a.,p,8g.,p,8d.,p,8g.,p,8d.6,p,4d.6,p,4c#6,p,b.,p,c#.6,p,2d.6",
    ghostBuster: "Ghostbus:d=16,o=5,b=112:g,g,8b,8g,8a,4f.,g,g,g,g,8f,4g.,g,g,8b,8g,8a,4f.,g,g,g,g,8f,8a,8g,4d.,g,g,8b,8g,8a,4f.,g,g,g,g,8f,4g.",
    flinstons: "Flinston:d=4,o=5,b=40:32p,16f6,16a#,16a#6,32g6,16f6,16a#.,16f6,32d#6,32d6,32d6,32d#6,32f6,16a#,16c6,d6,16f6,16a#.,16a#6,32g6,16f6,16a#.,32f6,32f6,32d#6,32d6,32d6,32d#6,32f6,16a#,16c6,a#,16a6,16d.6,16a#6,32a6,32a6,32g6,32f#6,32a6,8g6,16g6,16c.6,32a6,32a6,32g6,32g6,32f6,32e6,32g6,8f6,16f6,16a#.,16a#6,32g6,16f6,16a#.,16f6,32d#6,32d6,32d6,32d#6,32f6,16a#,16c.6,32d6,32d#6,32f6,16a#,16c.6,32d6,32d#6,32f6,16a#6,16c7,8a#.6"
};
rpio_1["default"].init({
    gpiomem: false,
    mapping: "physical"
});
var Buzzer = /** @class */ (function () {
    function Buzzer(pin) {
        if (pin === void 0) { pin = pins_1["default"].buzzer; }
        var _this = this;
        this.pwmClockDivider = 16;
        this.pwmClockFreq = 1.2e6;
        this.dutyCycle = 2; // Volume
        this.freqMultiplier = 3;
        this.noteCounter = 0;
        this.tune = rtttl_parse_1.parse(rtttls.startup);
        this.play = function (rttlName) {
            console.log("Playing " + rttlName);
            // Parse RTTTL to playable notes
            _this.tune = rtttl_parse_1.parse(rtttls[rttlName]);
            _this.noteCounter = 0;
            if (!_this.isPlaying) {
                _this.isPlaying = true;
                _this.playNextNote();
            }
        };
        this.playNote = function (frequency) {
            if (frequency === void 0) { frequency = 0; }
            console.log("Setting frequency: " + frequency);
            // Avoid divide by 0
            if (frequency !== 0) {
                var freq = frequency * _this.freqMultiplier;
                // Set PWM range based on clock frequency,
                // @ts-ignore
                rpio_1["default"].pwmSetRange(_this.rpioPin, _this.pwmClockFreq / freq);
                // and PWM data based on duty cycle
                // @ts-ignore
                rpio_1["default"].pwmSetData(_this.rpioPin, _this.pwmClockFreq / freq / _this.dutyCycle);
            }
            else {
                // @ts-ignore
                rpio_1["default"].pwmSetData(_this.rpioPin, 0);
            }
        };
        this.playNextNote = function () {
            var note = (_this.tune.melody || [])[_this.noteCounter];
            _this.noteCounter = _this.noteCounter + 1;
            if (!note) {
                _this.isPlaying = false;
                _this.playNote(0); // silence.
                return;
            }
            var frequency = note.frequency, duration = note.duration;
            _this.playNote(frequency);
            // Prepare for next note in melody sequence
            setTimeout(function () {
                _this.playNextNote();
            }, duration);
        };
        // Convert J5 pins ("P1-12") to rpio ("P12") pins
        // this.rpioPin = `P${pin.split("-")[1]}`;
        this.rpioPin = 12;
        // this.rpioPin = 12;
        // @ts-ignore
        rpio_1["default"].open(this.rpioPin, rpio_1["default"].PWM);
        rpio_1["default"].pwmSetClockDivider(this.pwmClockDivider);
    }
    return Buzzer;
}());
exports["default"] = Buzzer;
exports.test = function () {
    var b = new Buzzer();
    b.play("flinstons");
};
