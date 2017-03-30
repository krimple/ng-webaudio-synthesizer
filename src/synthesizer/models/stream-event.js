"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StreamEvent = (function () {
    function StreamEvent(payload, timeOffset) {
        this.payload = payload;
        this.timeOffset = timeOffset;
    }
    return StreamEvent;
}());
exports.StreamEvent = StreamEvent;
