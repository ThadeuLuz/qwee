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
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
// @ts-ignore
var misc_1 = require("../helpers/misc");
var sensors_1 = require("../sensors");
var Logger_1 = require("../sensors/Logger");
var Buzzer_1 = __importDefault(require("./Buzzer"));
var Flap_1 = __importDefault(require("./Flap"));
var Motor_1 = __importDefault(require("./Motor"));
exports.setup = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ({
                buzzer: new Buzzer_1["default"](),
                motorTop: new Motor_1["default"]("motorTop"),
                motorBottom: new Motor_1["default"]("motorBottom"),
                flapFront: new Flap_1["default"]("flapFront"),
                flapBack: new Flap_1["default"]("flapBack"),
                flapLeft: new Flap_1["default"]("flapLeft"),
                flapRight: new Flap_1["default"]("flapRight")
            })];
    });
}); };
exports.loop = function (actuators) {
    updateActuators(actuators);
    setTimeout(function () {
        exports.loop(actuators);
    }, 10);
};
var previousState = sensors_1.getState();
var state = sensors_1.getState();
var loopCount = 0;
var zRotationCompensation = 0;
// Updates actuators
var updateActuators = function (_a) {
    var buzzer = _a.buzzer, motorTop = _a.motorTop, motorBottom = _a.motorBottom, flapFront = _a.flapFront, flapBack = _a.flapBack, flapLeft = _a.flapLeft, flapRight = _a.flapRight;
    previousState = lodash_clonedeep_1["default"](state);
    state = lodash_clonedeep_1["default"](sensors_1.getState());
    loopCount = loopCount + 1;
    var _b = sensors_1.getHelpers(state, previousState), hasChanged = _b.hasChanged, changedTo = _b.changedTo;
    if (loopCount % 50 === 0) {
        sensors_1.printLogs();
        console.log(loopCount);
    }
    if (hasChanged("joystick", "status")) {
        if (state.joystick.status === "OK") {
            Logger_1.info("Joystick initialized");
            buzzer.play("startup");
        }
        else {
            Logger_1.warn("Joystick not found", state.joystick.status);
            buzzer.play("ops");
        }
    }
    // Break out if joystick is not present
    if (state.joystick.status !== "OK") {
        return;
    }
    if (changedTo("joystick", "x", true)) {
        buzzer.play("yay");
    }
    // Z Compenstion
    if (changedTo("joystick", "up", true)) {
        zRotationCompensation = zRotationCompensation + 0.01;
    }
    if (changedTo("joystick", "down", true)) {
        zRotationCompensation = zRotationCompensation - 0.01;
    }
    // Update Motors
    var motorSpeed = misc_1.scale(state.joystick.r2, 10, 255, 0, 1);
    motorTop.set(motorSpeed + zRotationCompensation);
    motorBottom.set(motorSpeed - zRotationCompensation);
    // Update Flaps
    var _c = state.joystick, lStickX = _c.lStickX, lStickY = _c.lStickY;
    var _d = state.imu, rotationX = _d.rotationX, rotationY = _d.rotationY;
    flapFront.set(lStickX, rotationX);
    flapBack.set(-lStickX, 0);
    flapRight.set(lStickY, rotationY);
    flapLeft.set(-lStickY, 0);
};
