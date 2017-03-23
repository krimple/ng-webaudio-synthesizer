"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        _super.call(this, action);
        this.note = note;
    }
    return SynthNoteMessage;
}(SynthMessage));
exports.SynthNoteMessage = SynthNoteMessage;
var SynthNoteOn = (function (_super) {
    __extends(SynthNoteOn, _super);
    function SynthNoteOn(note) {
        _super.call(this, note, 'ON');
    }
    return SynthNoteOn;
}(SynthNoteMessage));
exports.SynthNoteOn = SynthNoteOn;
var SynthNoteOff = (function (_super) {
    __extends(SynthNoteOff, _super);
    function SynthNoteOff(note) {
        _super.call(this, note, 'OFF');
    }
    return SynthNoteOff;
}(SynthNoteMessage));
exports.SynthNoteOff = SynthNoteOff;
var TriggerSample = (function (_super) {
    __extends(TriggerSample, _super);
    function TriggerSample(instrument, velocity) {
        _super.call(this, 'SAMPLE!');
        this.instrument = instrument;
        this.velocity = velocity;
    }
    return TriggerSample;
}(SynthMessage));
exports.TriggerSample = TriggerSample;
var ClockTick = (function (_super) {
    __extends(ClockTick, _super);
    function ClockTick() {
        _super.call(this, 'TICK');
    }
    return ClockTick;
}(SynthMessage));
exports.ClockTick = ClockTick;
var SynthControlMessage = (function (_super) {
    __extends(SynthControlMessage, _super);
    function SynthControlMessage() {
        _super.apply(this, arguments);
    }
    return SynthControlMessage;
}(SynthMessage));
exports.SynthControlMessage = SynthControlMessage;
var VolumeChange = (function (_super) {
    __extends(VolumeChange, _super);
    function VolumeChange(level) {
        _super.call(this, 'VOLUME');
        // hack due to arduino stupidity kenny
        this.level = Math.min(level / 127.0);
    }
    return VolumeChange;
}(SynthControlMessage));
exports.VolumeChange = VolumeChange;
var WaveformChange = (function (_super) {
    __extends(WaveformChange, _super);
    function WaveformChange(rawValue) {
        _super.call(this, 'WAVEFORM');
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
}(SynthControlMessage));
exports.WaveformChange = WaveformChange;
//# sourceMappingURL=synth-note-message.js.map