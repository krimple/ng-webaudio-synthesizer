var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ImprovedMidiInputService } from './inputs/improved-midi-input.service';
import { SynthesisService } from './synthesis/synthesis.service';
import { AudioOutputService } from './outputs/audio-output.service';
import { Injectable } from '@angular/core';
// TODO see if this is a problem - otherwise revert to rxjs
import { Subject } from 'rxjs/Subject';
import { DrumPCMTriggeringService } from './synthesis/drum-pcm-triggering.service';
import { MidiNoteService, Note } from './synthesis/midi-note.service';
var PipelineService = (function () {
    function PipelineService(midiNoteService, improvedMidiInputService, synthesisService, audioOutputService, drumPCMTriggeringService) {
        this.midiNoteService = midiNoteService;
        this.improvedMidiInputService = improvedMidiInputService;
        this.synthesisService = synthesisService;
        this.audioOutputService = audioOutputService;
        this.drumPCMTriggeringService = drumPCMTriggeringService;
        // TODO make protected by synthesized getter again
        this.synthStream$ = new Subject();
        this.audioContext = new AudioContext();
    }
    PipelineService.prototype.begin = function () {
        var self = this;
        // setup outputs
        this.audioOutputService.setup(this.audioContext, this.synthStream$);
        Note.configure(this.audioContext, this.audioOutputService.mainMixCompressor);
        this.midiNoteService.configure(this.audioContext, this.audioOutputService.mainMixCompressor);
        this.synthesisService.setup(this.audioContext, this.audioOutputService.mainMixCompressor);
        // setup drum service
        this.drumPCMTriggeringService.setup(this.audioContext, this.audioOutputService.mainMixCompressor, this.synthStream$);
        // setup inputs
        this.improvedMidiInputService.setup(this.synthStream$);
        // now send all note inputs coming from midi and non-midi sources (web page components, etc)
        this.synthStream$.subscribe(function (message) {
            self.synthesisService.receiveMessage(message);
        });
    };
    PipelineService.prototype.end = function () {
        // TODO - disconnect
    };
    return PipelineService;
}());
PipelineService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MidiNoteService,
        ImprovedMidiInputService,
        SynthesisService,
        AudioOutputService,
        DrumPCMTriggeringService])
], PipelineService);
export { PipelineService };
//# sourceMappingURL=pipeline.service.js.map