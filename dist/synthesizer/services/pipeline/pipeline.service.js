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
var improved_midi_input_service_1 = require("./inputs/improved-midi-input.service");
var synthesis_service_1 = require("./synthesis/synthesis.service");
var audio_output_service_1 = require("./outputs/audio-output.service");
var core_1 = require("@angular/core");
// TODO see if this is a problem - otherwise revert to rxjs
var Subject_1 = require("rxjs/Subject");
var drum_pcm_triggering_service_1 = require("./synthesis/drum-pcm-triggering.service");
var midi_note_service_1 = require("./synthesis/midi-note.service");
var note_input_service_1 = require("./inputs/note-input.service");
var PipelineService = (function () {
    function PipelineService(midiNoteService, improvedMidiInputService, noteInputService, synthesisService, audioOutputService, drumPCMTriggeringService) {
        this.midiNoteService = midiNoteService;
        this.improvedMidiInputService = improvedMidiInputService;
        this.noteInputService = noteInputService;
        this.synthesisService = synthesisService;
        this.audioOutputService = audioOutputService;
        this.drumPCMTriggeringService = drumPCMTriggeringService;
        // TODO make protected by synthesized getter again
        this.synthStream$ = new Subject_1.Subject();
        this.audioContext = new AudioContext();
    }
    PipelineService.prototype.begin = function () {
        var self = this;
        // setup outputs
        this.audioOutputService.setup(this.audioContext, this.synthStream$);
        midi_note_service_1.Note.configure(this.audioContext, this.audioOutputService.mainMixCompressor);
        this.midiNoteService.configure(this.audioContext, this.audioOutputService.mainMixCompressor);
        this.synthesisService.setup(this.audioContext, this.audioOutputService.mainMixCompressor);
        // setup drum service
        this.drumPCMTriggeringService.setup(this.audioContext, this.audioOutputService.mainMixCompressor, this.synthStream$);
        // setup inputs
        this.improvedMidiInputService.setup(this.synthStream$);
        this.noteInputService.setup(this.synthStream$);
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
    core_1.Injectable(),
    __metadata("design:paramtypes", [midi_note_service_1.MidiNoteService,
        improved_midi_input_service_1.ImprovedMidiInputService,
        note_input_service_1.NoteInputService,
        synthesis_service_1.SynthesisService,
        audio_output_service_1.AudioOutputService,
        drum_pcm_triggering_service_1.DrumPCMTriggeringService])
], PipelineService);
exports.PipelineService = PipelineService;
//# sourceMappingURL=pipeline.service.js.map