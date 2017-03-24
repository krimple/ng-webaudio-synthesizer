"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pipeline_service_1 = require("./services/pipeline/pipeline.service");
var improved_midi_input_service_1 = require("./services/pipeline/inputs/improved-midi-input.service");
var drum_pcm_triggering_service_1 = require("./services/pipeline/synthesis/drum-pcm-triggering.service");
var synthesis_service_1 = require("./services/pipeline/synthesis/synthesis.service");
var audio_output_service_1 = require("./services/pipeline/outputs/audio-output.service");
var midi_note_service_1 = require("./services/pipeline/synthesis/midi-note.service");
var sequencer_service_1 = require("./services/pipeline/processors/sequencer.service");
var http_1 = require("@angular/http");
var note_input_service_1 = require("./services/pipeline/inputs/note-input.service");
var SynthesizerModule = (function () {
    function SynthesizerModule() {
    }
    return SynthesizerModule;
}());
SynthesizerModule = __decorate([
    core_1.NgModule({
        imports: [
            http_1.HttpModule
        ],
        providers: [
            pipeline_service_1.PipelineService,
            midi_note_service_1.MidiNoteService,
            improved_midi_input_service_1.ImprovedMidiInputService,
            note_input_service_1.NoteInputService,
            audio_output_service_1.AudioOutputService,
            drum_pcm_triggering_service_1.DrumPCMTriggeringService,
            sequencer_service_1.SequencerService,
            synthesis_service_1.SynthesisService
        ]
    })
], SynthesizerModule);
exports.SynthesizerModule = SynthesizerModule;
//# sourceMappingURL=synthesizer.module.js.map