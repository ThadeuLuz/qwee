"use strict";
exports.__esModule = true;
exports.clamp = function (value, min, max) {
    return Math.min(Math.max(min, value), max);
};
exports.scale = function (value, fromLow, fromHigh, toLow, toHigh, isClamped) {
    if (isClamped === void 0) { isClamped = true; }
    var clampV = isClamped ? exports.clamp(value, fromLow, fromHigh) : value;
    return ((clampV - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
};
