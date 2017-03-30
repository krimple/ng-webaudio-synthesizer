import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthNoteOff, SynthNoteOn, TriggerSample } from './models/synth-note-message';
import { AudioOutput } from './support/audio-output';
import { MidiInput } from './support/midi-input';
import { Http } from '@angular/http';
import { MidiNote } from './support/midi-note';
var SynthesizerService = (function () {
    function SynthesizerService(http, zone) {
        this.http = http;
        this.synthStream$ = new Subject();
        this.audioContext = new AudioContext() || new window['webkitAudioContext']();
        this.audioOutput = new AudioOutput(this.synthStream$, this.audioContext);
        this.audioOutput.begin();
        this.midiNote = new MidiNote(this.synthStream$, this.audioContext, this.audioOutput.mainMixFinalGain);
        this.midiInput = new MidiInput(http, this.synthStream$, zone);
        this.midiInput.begin();
    }
    SynthesizerService.prototype.sendNote = function (note, duration) {
        if (duration === void 0) { duration = 300; }
        var self = this;
        this.synthStream$.next(new SynthNoteOn(note));
        setTimeout(function () {
            self.synthStream$.next(new SynthNoteOff(note));
        }, duration);
    };
    SynthesizerService.prototype.triggerSample = function (sample) {
        this.synthStream$.next(new TriggerSample(sample, 100));
    };
    return SynthesizerService;
}());
export { SynthesizerService };
SynthesizerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SynthesizerService.ctorParameters = function () { return [
    { type: Http, },
    { type: NgZone, },
]; };
//# sourceMappingURL=synthesizer.service.js.map