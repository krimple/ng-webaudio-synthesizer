"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var synth_note_message_1 = require("./models/synth-note-message");
var audio_output_1 = require("./support/audio-output");
var midi_input_1 = require("./support/midi-input");
var drum_machine_1 = require("./support/drum-machine");
var http_1 = require("@angular/http");
var midi_note_1 = require("./support/midi-note");
var SynthesizerService = (function () {
    function SynthesizerService(http, zone) {
        this.http = http;
        this.synthStream$ = new rxjs_1.Subject();
        this.audioContext = new AudioContext() || new window['webkitAudioContext']();
        this.audioOutput = new audio_output_1.AudioOutput(this.synthStream$, this.audioContext);
        this.audioOutput.begin();
        this.midiNote = new midi_note_1.MidiNote(this.synthStream$, this.audioContext, this.audioOutput.mainMixFinalGain);
        this.midiInput = new midi_input_1.MidiInput(http, this.synthStream$, zone);
        this.midiInput.begin();
        this.drumMachine = new drum_machine_1.DrumMachine(this.synthStream$, this.audioContext, this.audioOutput.mainMixFinalGain, http);
        this.drumMachine.begin();
    }
    SynthesizerService.prototype.sendNote = function (note, duration) {
        if (duration === void 0) { duration = 300; }
        var self = this;
        this.synthStream$.next(new synth_note_message_1.SynthNoteOn(note));
        setTimeout(function () {
            self.synthStream$.next(new synth_note_message_1.SynthNoteOff(note));
        }, duration);
    };
    SynthesizerService.prototype.triggerSample = function (sample) {
        this.synthStream$.next(new synth_note_message_1.TriggerSample(sample, 100));
    };
    return SynthesizerService;
}());
SynthesizerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, core_1.NgZone])
], SynthesizerService);
exports.SynthesizerService = SynthesizerService;
//# sourceMappingURL=synthesizer.service.js.map