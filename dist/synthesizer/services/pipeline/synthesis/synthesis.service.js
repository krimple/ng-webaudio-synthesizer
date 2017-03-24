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
var models_1 = require("../../../models");
var midi_note_service_1 = require("./midi-note.service");
var synth_note_message_1 = require("../../../models/synth-note-message");
var SynthesisService = (function () {
    function SynthesisService(midiNoteService) {
        this.midiNoteService = midiNoteService;
        // TODO - figure out how to modify on the fly (event?)
        this.currentWaveForm = 'sawtooth';
    }
    // send a message to the synth upon receipt from outside world
    SynthesisService.prototype.receiveMessage = function (message) {
        this.noteStream$.next(message);
    };
    SynthesisService.prototype.setup = function (audioContext, targetNode) {
        console.log("audioContext is " + audioContext);
        this.audioContext = audioContext;
        this.targetNode = targetNode;
        this.noteStream$ = new rxjs_1.Subject();
        // this.setupNotes(audioContext, targetNode);
        this.setupSubscriptions();
    };
    SynthesisService.prototype.setupSubscriptions = function () {
        var _this = this;
        var self = this;
        this.noteStream$
            .filter(function (message) { return !(message instanceof synth_note_message_1.TriggerSample); })
            .subscribe(function (message) {
            if (message instanceof models_1.SynthNoteOn) {
                if (typeof message.note === 'number') {
                    _this.midiNoteService.playNoteByMidiNoteNumber(message.note);
                }
                else {
                    _this.midiNoteService.playNoteByNoteValue(message.note);
                }
                // TODO restore this
            }
            else if (message instanceof synth_note_message_1.ClockTick) {
                console.log('pulse!');
                self.clockTick();
            }
            else if (message instanceof models_1.SynthNoteOff) {
                if (typeof message.note === 'number') {
                    _this.midiNoteService.stopNoteByMidiNoteNumber(message.note);
                }
                else {
                    _this.midiNoteService.stopNoteByNoteValue(message.note);
                }
            }
            else if (message instanceof models_1.WaveformChange) {
                console.log('new waveform value is ', message.waveForm);
                midi_note_service_1.Note.changeWaveform(message);
            }
            else {
                console.log('unknown message', JSON.stringify(message));
            }
        });
    };
    SynthesisService.prototype.clockTick = function () {
        var oscillator = this.audioContext.createOscillator();
        var gain = this.audioContext.createGain();
        gain.gain.value = 0.2;
        oscillator.connect(gain);
        gain.connect(this.targetNode);
        oscillator.type = 'square';
        oscillator.frequency.value = 1000;
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 100);
    };
    return SynthesisService;
}());
SynthesisService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [midi_note_service_1.MidiNoteService])
], SynthesisService);
exports.SynthesisService = SynthesisService;
//# sourceMappingURL=synthesis.service.js.map