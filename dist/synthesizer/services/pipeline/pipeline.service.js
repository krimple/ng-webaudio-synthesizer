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
var midi_input_service_1 = require("./inputs/midi-input.service");
var audio_output_service_1 = require("./outputs/audio-output.service");
var core_1 = require("@angular/core");
// TODO see if this is a problem - otherwise revert to rxjs
var Subject_1 = require("rxjs/Subject");
var drum_pcm_triggering_service_1 = require("./synthesis/drum-pcm-triggering.service");
var midi_note_service_1 = require("./synthesis/midi-note.service");
var note_input_service_1 = require("./inputs/note-input.service");
var drum_machine_input_service_1 = require("./inputs/drum-machine-input.service");
var PipelineServiceEvents;
(function (PipelineServiceEvents) {
    PipelineServiceEvents[PipelineServiceEvents["CONNECTED"] = 0] = "CONNECTED";
    PipelineServiceEvents[PipelineServiceEvents["DISCONNECTED"] = 1] = "DISCONNECTED";
})(PipelineServiceEvents = exports.PipelineServiceEvents || (exports.PipelineServiceEvents = {}));
var PipelineService = (function () {
    // imagine a world where the injector could actually inject
    // a typed subject that is configured by a factory!  2/3 of this
    // code would not need to exist!!! ng team needs to simplify
    // DI in Angular 2+ and make it easier to create injectable objects of generic types
    // OR, heck, I have a silly bug and hubris aplenty (which is likely)
    function PipelineService(audioContext, synthStream$, midiNoteService, midiInputService, drumMachineInputService, noteInputService, audioOutputService, drumPCMTriggeringService) {
        this.audioContext = audioContext;
        this.synthStream$ = synthStream$;
        this.midiNoteService = midiNoteService;
        this.midiInputService = midiInputService;
        this.drumMachineInputService = drumMachineInputService;
        this.noteInputService = noteInputService;
        this.audioOutputService = audioOutputService;
        this.drumPCMTriggeringService = drumPCMTriggeringService;
        // TODO make protected by synthesized getter again
        this.serviceEvents$ = new Subject_1.Subject();
        this.audioContext = new AudioContext();
    }
    PipelineService.prototype.sendSynthMessage = function (message) {
        this.synthStream$.next(message);
    };
    PipelineService.prototype.begin = function () {
        // set up note processing oscillator hooks
        midi_note_service_1.Note.configure(this.audioContext, this.synthStream$, this.audioOutputService.mainMixCompressor);
        this.midiNoteService.setup(this.synthStream$, this.audioOutputService.mainMixCompressor);
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
    core_1.Injectable(),
    __metadata("design:paramtypes", [Object, Subject_1.Subject,
        midi_note_service_1.MidiNoteService,
        midi_input_service_1.MidiInputService,
        drum_machine_input_service_1.DrumMachineInputService,
        note_input_service_1.NoteInputService,
        audio_output_service_1.AudioOutputService,
        drum_pcm_triggering_service_1.DrumPCMTriggeringService])
], PipelineService);
exports.PipelineService = PipelineService;
//# sourceMappingURL=pipeline.service.js.map