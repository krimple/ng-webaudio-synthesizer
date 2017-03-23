import { NgModule } from '@angular/core';
import { PipelineService } from './services/pipeline/pipeline.service';
import { ImprovedMidiInputService } from './services/pipeline/inputs/improved-midi-input.service';
import { DrumPCMTriggeringService } from './services/pipeline/synthesis/drum-pcm-triggering.service';
import { SynthesisService } from './services/pipeline/synthesis/synthesis.service';
import { AudioOutputService } from './services/pipeline/outputs/audio-output.service';
import { MidiNoteService } from './services/pipeline/synthesis/midi-note.service';
import { SequencerService } from './services/pipeline/processors/sequencer.service';
@NgModule({
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
export class SynthesizerModule { }
