"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// Usa Hardware PWM
// @ts-ignore
var raspi_pwm_1 = require("raspi-pwm");
var rtttl_parse_1 = require("rtttl-parse");
var pins_1 = __importDefault(require("../helpers/pins"));
// Play here: https://adamonsoon.github.io/rtttl-play/
var rtttls = {
    startup: "Default:d=16,o=6,b=200:d,d#,e,f,f#",
    backToTheFuture: "Back to the Future:d=16,o=5,b=200:4g.,p,4c.,p,2f#.,p,g.,p,a.,p,8g,p,8e,p,8c,p,4f#,p,g.,p,a.,p,8g.,p,8d.,p,8g.,p,8d.6,p,4d.6,p,4c#6,p,b.,p,c#.6,p,2d.6"
};
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
        this.setFreq = function (frequency) {
            if (frequency === void 0) { frequency = 0; }
            console.log("Setting frequency: " + frequency);
            // Avoid divide by 0
            if (frequency !== 0) {
                var freq = frequency * _this.freqMultiplier;
                // Set PWM range based on clock frequency,
                // @ts-ignore
                rpio.pwmSetRange(_this.rpioPin, _this.pwmClockFreq / freq);
                // and PWM data based on duty cycle
                // @ts-ignore
                rpio.pwmSetData(_this.rpioPin, _this.pwmClockFreq / freq / _this.dutyCycle);
            }
            else {
                // @ts-ignore
                rpio.pwmSetData(_this.rpioPin, 0);
            }
        };
        this.playNextNote = function () {
            var note = (_this.tune.melody || [])[_this.noteCounter];
            _this.noteCounter = _this.noteCounter + 1;
            if (!note) {
                _this.isPlaying = false;
                _this.setFreq(0); // silence.
                return;
            }
            var frequency = note.frequency, duration = note.duration;
            _this.setFreq(frequency);
            // Prepare for next note in melody sequence
            setTimeout(function () {
                _this.playNextNote();
            }, duration);
        };
        this.buzzer = new raspi_pwm_1.PWM(pin);
    }
    return Buzzer;
}());
exports["default"] = Buzzer;
exports.test = function () {
    var b = new Buzzer();
    b.play("backToTheFuture");
};
