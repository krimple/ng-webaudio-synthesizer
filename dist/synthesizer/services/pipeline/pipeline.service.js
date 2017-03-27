var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { MidiInputService } from './inputs/midi-input.service';
import { SynthesisService } from './synthesis/synthesis.service';
import { AudioOutputService } from './outputs/audio-output.service';
import { Injectable } from '@angular/core';
// TODO see if this is a problem - otherwise revert to rxjs
import { Subject } from 'rxjs/Subject';
import { DrumPCMTriggeringService } from './synthesis/drum-pcm-triggering.service';
import { MidiNoteService, Note } from './synthesis/midi-note.service';
import { NoteInputService } from './inputs/note-input.service';
import { ReplaySubject } from 'rxjs';
import { DrumMachineInputService } from './inputs/drum-machine-input.service';
export var PipelineServiceEvents;
(function (PipelineServiceEvents) {
    PipelineServiceEvents[PipelineServiceEvents["CONNECTED"] = 0] = "CONNECTED";
    PipelineServiceEvents[PipelineServiceEvents["DISCONNECTED"] = 1] = "DISCONNECTED";
})(PipelineServiceEvents || (PipelineServiceEvents = {}));
var PipelineService = (function () {
    // imagine a world where the injector could actually inject
    // a typed subject that is configured by a factory!  2/3 of this
    // code would not need to exist!!! ng team needs to simplify
    // DI in Angular 2+ and make it easier to create injectable objects of generic types
    // OR, heck, I have a silly bug and hubris aplenty (which is likely)
    function PipelineService(midiNoteService, midiInputService, drumMachineInputService, noteInputService, synthesisService, audioOutputService, drumPCMTriggeringService) {
        this.midiNoteService = midiNoteService;
        this.midiInputService = midiInputService;
        this.drumMachineInputService = drumMachineInputService;
        this.noteInputService = noteInputService;
        this.synthesisService = synthesisService;
        this.audioOutputService = audioOutputService;
        this.drumPCMTriggeringService = drumPCMTriggeringService;
        // this is ridiculous - I can't use a factory or value to
        // create this in an injector. Seems to be because it is
        // not able to introspect the right type metadata at runtime
        // so for NOW, I will configure streams manually
        this.synthStream$ = new ReplaySubject();
        // TODO make protected by synthesized getter again
        this.serviceEvents$ = new Subject();
        this.audioContext = new AudioContext();
    }
    PipelineService.prototype.sendSynthMessage = function (message) {
        this.synthStream$.next(message);
    };
    PipelineService.prototype.begin = function () {
        // setup outputs
        this.audioOutputService.setup(this.synthStream$, this.audioContext);
        // set up note processing oscillator hooks
        Note.configure(this.audioContext, this.synthStream$, this.audioOutputService.mainMixCompressor);
        this.midiNoteService.setup(this.audioContext, this.synthStream$, this.audioOutputService.mainMixCompressor);
        // set up the synthesis engine itself
        this.synthesisService.setup(this.synthStream$, this.audioContext, this.audioOutputService.mainMixCompressor);
        // setup drum service
        this.drumPCMTriggeringService.setup(this.synthStream$, this.audioContext, this.audioOutputService.mainMixCompressor);
        // enable audio
        this.audioOutputService.begin();
        // wire inputs
        this.drumMachineInputService.setup(this.synthStream$);
        this.midiInputService.setup(this.synthStream$);
        this.noteInputService.setup(this.synthStream$);
        // // now send all note inputs coming from midi and non-midi sources (web page components, etc)
        // this.synthStream$.subscribe(
        //   (message: SynthMessage) => {
        //     this.synthesisService.receiveMessage(message);
        //   }
        // );
    };
    PipelineService.prototype.end = function () {
        this.midiInputService.endMidiInput();
        this.noteInputService.end();
        this.audioOutputService.end();
    };
    return PipelineService;
}());
PipelineService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MidiNoteService,
        MidiInputService,
        DrumMachineInputService,
        NoteInputService,
        SynthesisService,
        AudioOutputService,
        DrumPCMTriggeringService])
], PipelineService);
export { PipelineService };
//# sourceMappingURL=pipeline.service.js.map