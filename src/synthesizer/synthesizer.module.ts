import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PipelineService } from './services/pipeline/pipeline.service';
import { MidiInputService } from './services/pipeline/inputs/midi-input.service';
import { DrumMachineInputService } from './services/pipeline/inputs/drum-machine-input.service';
import { DrumPCMTriggeringService } from './services/pipeline/synthesis/drum-pcm-triggering.service';
import { AudioOutputService } from './services/pipeline/outputs/audio-output.service';
import { MidiNoteService } from './services/pipeline/synthesis/midi-note.service';
import { SequencerService } from './services/pipeline/processors/sequencer.service';
import { NoteInputService } from './services/pipeline/inputs/note-input.service';

@NgModule({
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
    SequencerService
  ]
})
export class SynthesizerModule { }
