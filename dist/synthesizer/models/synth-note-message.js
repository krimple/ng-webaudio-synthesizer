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
    function SynthMessage(action) {
        this.action = action;
    }
    return SynthMessage;
}());
exports.SynthMessage = SynthMessage;
var SynthNoteMessage = (function (_super) {
    __extends(SynthNoteMessage, _super);
    function SynthNoteMessage(note, action) {
        var _this = _super.call(this, action) || this;
        _this.note = note;
        return _this;
    }
    return SynthNoteMessage;
}(SynthMessage));
exports.SynthNoteMessage = SynthNoteMessage;
var SynthNoteOn = (function (_super) {
    __extends(SynthNoteOn, _super);
    function SynthNoteOn(note) {
        return _super.call(this, note, 'ON') || this;
    }
    return SynthNoteOn;
}(SynthNoteMessage));
exports.SynthNoteOn = SynthNoteOn;
var SynthNoteOff = (function (_super) {
    __extends(SynthNoteOff, _super);
    function SynthNoteOff(note) {
        return _super.call(this, note, 'OFF') || this;
    }
    return SynthNoteOff;
}(SynthNoteMessage));
exports.SynthNoteOff = SynthNoteOff;
var TriggerSample = (function (_super) {
    __extends(TriggerSample, _super);
    function TriggerSample(instrument, velocity) {
        var _this = _super.call(this, 'SAMPLE!') || this;
        _this.instrument = instrument;
        _this.velocity = velocity;
        return _this;
    }
    return TriggerSample;
}(SynthMessage));
exports.TriggerSample = TriggerSample;
var ClockTick = (function (_super) {
    __extends(ClockTick, _super);
    function ClockTick() {
        return _super.call(this, 'TICK') || this;
    }
    return ClockTick;
}(SynthMessage));
exports.ClockTick = ClockTick;
var SynthControlMessage = (function (_super) {
    __extends(SynthControlMessage, _super);
    function SynthControlMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SynthControlMessage;
}(SynthMessage));
exports.SynthControlMessage = SynthControlMessage;
var VolumeChange = (function (_super) {
    __extends(VolumeChange, _super);
    function VolumeChange(level) {
        var _this = _super.call(this, 'VOLUME') || this;
        // hack due to arduino stupidity kenny
        _this.level = Math.min(level / 127.0);
        return _this;
    }
    return VolumeChange;
}(SynthControlMessage));
exports.VolumeChange = VolumeChange;
var WaveformChange = (function (_super) {
    __extends(WaveformChange, _super);
    function WaveformChange(rawValue) {
        var _this = _super.call(this, 'WAVEFORM') || this;
        _this.rawValue = rawValue;
        switch (rawValue) {
            case 0:
                _this.waveForm = 'sawtooth';
                break;
            case 1:
                _this.waveForm = 'sine';
                break;
            case 2:
                _this.waveForm = 'triangle';
                break;
            case 3:
                _this.waveForm = 'square';
                break;
            default:
                _this.waveForm = 'sawtooth';
        }
        return _this;
    }
    return WaveformChange;
}(SynthControlMessage));
exports.WaveformChange = WaveformChange;
//# sourceMappingURL=synth-note-message.js.map