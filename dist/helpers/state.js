"use strict";
exports.__esModule = true;
exports.initialState = {
    joystick_x: false,
    joystick_square: false,
    joystick_triangle: false,
    joystick_circle: false,
    joystick_l1: false,
    joystick_l2: 0,
    joystick_lStickX: 0,
    joystick_l3: false,
    joystick_lStickY: 0,
    joystick_r1: false,
    joystick_r2: 0,
    joystick_rStickY: 0,
    joystick_rStickX: 0,
    joystick_r3: false,
    joystick_hat: false,
    joystick_up: false,
    joystick_left: false,
    joystick_down: false,
    joystick_right: false,
    joystick_select: false,
    joystick_start: false,
    joystick_ps: false,
    message: "Inicializing..."
};
var state = exports.initialState;
var previousState = exports.initialState;
var nextChanges = {};
var subscriptions = [];
exports.getState = function () { return state; };
exports.setState = function (changes) {
    nextChanges = Object.assign(nextChanges, changes);
};
exports.subscriptionLoop = function () {
    previousState = state;
    state = Object.assign(state, nextChanges);
    nextChanges = {};
    subscriptions.forEach(function (subscriptions) {
        subscriptions(state, previousState, exports.getHelpers(state, previousState));
    });
};
exports.subscribe = function (subscription) {
    subscriptions.push(subscription);
};
exports.unsubscribe = function (subscription) {
    subscriptions = subscriptions.filter(function (s) { return s !== subscription; });
};
exports.getHelpers = function (state, previousState) {
    var hasChanged = function (prop) { return state[prop] !== previousState[prop]; };
    var changedTo = function (prop, value) {
        return hasChanged(prop) && state[prop] === value;
    };
    return { hasChanged: hasChanged, changedTo: changedTo };
};
