"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var johnny_five_1 = require("johnny-five");
var pins_1 = __importDefault(require("../helpers/pins"));
// Varies 40 degrees
var variance = 40;
var offsets = {
    flapFront: 0,
    flapBack: 0,
    flapLeft: 0,
    flapRight: 0
};
var getFlap = function (name) {
    return new johnny_five_1.Servo({
        center: true,
        // @ts-ignore
        offset: offsets[name],
        pin: pins_1["default"][name],
        range: [90 - variance, 90 + variance]
    });
};
exports["default"] = (function () { return ({
    flapFront: getFlap("flapFront"),
    flapBack: getFlap("flapBack"),
    flapLeft: getFlap("flapLeft"),
    flapRight: getFlap("flapRight")
}); });
