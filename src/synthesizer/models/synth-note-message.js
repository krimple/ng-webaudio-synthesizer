"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SynthMessage = (function () {
    function SynthMessage() {
    }
    return SynthMessage;
}());
exports.SynthMessage = SynthMessage;
var SynthNoteMessage = (function () {
    function SynthNoteMessage(note) {
        this.note = note;
    }
    return SynthNoteMessage;
}());
exports.SynthNoteMessage = SynthNoteMessage;
var SynthNoteOn = (function (_super) {
    __extends(SynthNoteOn, _super);
    function SynthNoteOn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SynthNoteOn;
}(SynthNoteMessage));
exports.SynthNoteOn = SynthNoteOn;
var SynthNoteOff = (function (_super) {
    __extends(SynthNoteOff, _super);
    function SynthNoteOff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SynthNoteOff;
}(SynthNoteMessage));
exports.SynthNoteOff = SynthNoteOff;
var TriggerSample = (function () {
    function TriggerSample(instrument, velocity) {
        this.instrument = instrument;
        this.velocity = velocity;
    }
    return TriggerSample;
}());
exports.TriggerSample = TriggerSample;
var ClockTick = (function () {
    function ClockTick() {
    }
    return ClockTick;
}());
exports.ClockTick = ClockTick;
var SynthControlMessage = (function () {
    function SynthControlMessage() {
    }
    return SynthControlMessage;
}());
exports.SynthControlMessage = SynthControlMessage;
var VolumeChange = (function () {
    function VolumeChange(level) {
        // hack due to arduino stupidity kenny
        this.level = Math.min(level / 127.0);
    }
    return VolumeChange;
}());
exports.VolumeChange = VolumeChange;
var WaveformChange = (function () {
    function WaveformChange(rawValue) {
        this.rawValue = rawValue;
        switch (rawValue) {
            case 0:
                this.waveForm = 'sawtooth';
                break;
            case 1:
                this.waveForm = 'sine';
                break;
            case 2:
                this.waveForm = 'triangle';
                break;
            case 3:
                this.waveForm = 'square';
                break;
            default:
                this.waveForm = 'sawtooth';
        }
    }
    return WaveformChange;
}());
exports.WaveformChange = WaveformChange;
