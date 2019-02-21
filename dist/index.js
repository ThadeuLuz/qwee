"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var johnny_five_1 = __importDefault(require("johnny-five"));
// @ts-ignore
var raspi_io_1 = __importDefault(require("raspi-io"));
var Buzzer_1 = __importDefault(require("./devices/Buzzer"));
var Joystick_1 = __importDefault(require("./devices/Joystick"));
// import Motor from "./devices/Motor";
// import { scale } from "./helpers/misc";
var state_1 = require("./helpers/state");
var qwee = new johnny_five_1["default"].Board({
    io: new raspi_io_1["default"]({ enableSoftPwm: true })
});
var messages = Array(10).fill("-");
var log = function (message) {
    messages.shift();
    messages.push(message);
};
// Initialize board
qwee.on("ready", function () { return __awaiter(_this, void 0, void 0, function () {
    var buzzer, previousState, state, updateLoop;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                buzzer = new Buzzer_1["default"]();
                buzzer.play("startup");
                // Initialize Joystick
                console.log("Connecting joystick");
                return [4 /*yield*/, Joystick_1["default"](function () {
                        buzzer.play("ops");
                    })];
            case 1:
                _a.sent();
                buzzer.play("yay");
                previousState = state_1.initialState;
                state = state_1.initialState;
                updateLoop = function () {
                    previousState = state;
                    state = state_1.getState();
                    // Print state and messages to console
                    console.clear();
                    console.log(state);
                    messages.forEach(function (m) { return console.log(m); });
                    var _a = state_1.getHelpers(state, previousState), hasChanged = _a.hasChanged, changedTo = _a.changedTo;
                    if (changedTo("joystick_x", true)) {
                        buzzer.play("yay");
                    }
                    if (hasChanged("joystick_r2")) {
                        // @ts-ignore
                        // const [tmin, tmax] = motorTop.pwmRange || motorTop.range;
                        // const [tmin, tmax] = motorTop.pwmRange || motorTop.range;
                        var throttle = scale(state.joystick_r2, 10, 255, 1000, 2000);
                        log("" + throttle);
                    }
                    setTimeout(function () {
                        // update again
                        updateLoop();
                    }, 500);
                };
                return [2 /*return*/];
        }
    });
}); });
//   if (settings.piezo) {
//     qwee.repl.inject({ piezo });
//   }
//   if (settings.motors) {
//   }
//   // Reactions to state changes
//   const reactToStateChanges = (state, oldState, { wasPressed }) => {
//     // Buzz if x is pressed
//     if (piezo && joystick) {
//       if (state.joystick_x === true && oldState.joystick_x === false) {
//         piezo.frequency(587, 1000);
//         setTimeout(() => {
//           piezo.off();
//         }, 1000);
//       }
//     }
//     const [tmin, tmax] = motorTop.pwmRange;
//     const throttle = scale(state.joystick_r2, 10, 255, tmin, tmax);
//     console.log("motor", motorTop.pwmRange, throttle);
//     motorTop.throttle(throttle);
//   };
//   state.subscribe(reactToStateChanges);
//   // js.setState =
//   // info("info");
//   // warn("warn");
//   // error("error");
//   // await js.initialize();
//   // js.updateState()
//   // const js = await joystick();
//   // js.onChange();
//   // this.setJoystickExtras = js.setExtras;
// });
