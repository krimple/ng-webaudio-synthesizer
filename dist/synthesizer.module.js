var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { PipelineService } from './services/pipeline/pipeline.service';
import { ImprovedMidiInputService } from './services/pipeline/inputs/improved-midi-input.service';
import { DrumPCMTriggeringService } from './services/pipeline/synthesis/drum-pcm-triggering.service';
import { SynthesisService } from './services/pipeline/synthesis/synthesis.service';
import { AudioOutputService } from './services/pipeline/outputs/audio-output.service';
import { MidiNoteService } from './services/pipeline/synthesis/midi-note.service';
import { SequencerService } from './services/pipeline/processors/sequencer.service';
var SynthesizerModule = (function () {
    function SynthesizerModule() {
    }
    return SynthesizerModule;
}());
SynthesizerModule = __decorate([
    NgModule({
        providers: [
            PipelineService,
            MidiNoteService,
            ImprovedMidiInputService,
            AudioOutputService,
            DrumPCMTriggeringService,
            SequencerService,
            SynthesisService
        ],
    })
], SynthesizerModule);
export { SynthesizerModule };
//# sourceMappingURL=synthesizer.module.js.map