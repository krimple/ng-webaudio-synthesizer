var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { PipelineService } from './services/pipeline/pipeline.service';
import { MidiInputService } from './services/pipeline/inputs/midi-input.service';
import { DrumMachineInputService } from './services/pipeline/inputs/drum-machine-input.service';
import { DrumPCMTriggeringService } from './services/pipeline/synthesis/drum-pcm-triggering.service';
import { SynthesisService } from './services/pipeline/synthesis/synthesis.service';
import { AudioOutputService } from './services/pipeline/outputs/audio-output.service';
import { MidiNoteService } from './services/pipeline/synthesis/midi-note.service';
import { SequencerService } from './services/pipeline/processors/sequencer.service';
import { HttpModule } from "@angular/http";
import { NoteInputService } from './services/pipeline/inputs/note-input.service';
var SynthesizerModule = (function () {
    function SynthesizerModule() {
    }
    return SynthesizerModule;
}());
SynthesizerModule = __decorate([
    NgModule({
        imports: [
            HttpModule
        ],
        providers: [
            PipelineService,
            MidiNoteService,
            DrumMachineInputService,
            MidiInputService,
            NoteInputService,
            AudioOutputService,
            DrumPCMTriggeringService,
            SequencerService,
            SynthesisService
        ]
    })
], SynthesizerModule);
export { SynthesizerModule };
//# sourceMappingURL=synthesizer.module.js.map