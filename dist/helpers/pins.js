"use strict";
exports.__esModule = true;
var Pins = {
    // "P1-1", // 3.3V
    // "P1-3", // SDA0
    // "P1-5", // SCL0
    // "P1-7", // GPIO4
    // "P1-9", // GND
    // "P1-11", // GPIO17
    // "P1-13", // 2 GPIO27
    // "P1-15", // 3 GPIO22
    // "P1-17", // 3.3V
    // "P1-19", // 12 GPIO10/MOSI0
    // "P1-21", // 13 GPIO9/MISO0
    // "P1-23", // 14 GPIO11/SCLK0
    // "P1-25", // GND
    // "P1-27", // Do Not Connect
    // "P1-29", // 21 GPIO5
    // "P1-31", // 22 GPIO6
    // NAO USE! "P1-33", // 23 GPIO13/PWM1 (da erro com raspi-pwm)
    // "P1-35", // 24 GPIO19/MISO1/PWM1
    // "P1-37", // 25 GPIO26
    // "P1-39", // GND
    // "P1-2", // 5V
    // "P1-4", // 5V
    // "P1-6", // GND
    // motorTop: "P1-8", // GPIO14/TXD0     (Q)
    // "P1-10", // GPIO15/RXD0              (P)
    buzzer: "P1-12",
    // _jumper: "P1-14", // GND                (N)
    motorTop: "P1-16",
    motorBottom: "P1-18",
    //           "P1-20", // GND            (K)
    flapFront: "P1-22",
    flapBack: "P1-24",
    flapLeft: "P1-26",
    //           "P1-28", // Do Not Connect (G)
    //           "P1-30", // GND            (F)
    // NAO USE! "P1-32", // GPIO12/PWM0     (E) (da erro com raspi-pwm)
    //           "P1-34", // GND            (D)
    flapRight: "P1-36" // GPIO16            (C)
    //           "P1-38", // GPIO20/MOSI1   (B)
    //           "P1-40", // GPIO21/SCLK1   (A)
};
exports["default"] = Pins;