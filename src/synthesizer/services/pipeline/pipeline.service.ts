import { ImprovedMidiInputService } from './inputs/improved-midi-input.service';
import { SynthesisService } from './synthesis/synthesis.service';
import { AudioOutputService } from './outputs/audio-output.service';
import { Injectable } from '@angular/core';

// TODO see if this is a problem - otherwise revert to rxjs
import { Subject } from 'rxjs/Subject';

import { DrumPCMTriggeringService } from './synthesis/drum-pcm-triggering.service';
import { MidiNoteService, Note } from './synthesis/midi-note.service';
import { SynthMessage } from '../../models';
import { AsyncSubject, ReplaySubject } from 'rxjs';
declare var AudioContext: any;

@Injectable()
export class PipelineService {

  // TODO lost typings in latest version of angular/cli

  private audioContext: any;

  // TODO make protected by synthesized getter again
  readonly synthStream$ = new Subject<SynthMessage>();

  constructor(private midiNoteService: MidiNoteService,
              private improvedMidiInputService: ImprovedMidiInputService,
              private synthesisService: SynthesisService,
              private audioOutputService: AudioOutputService,
              private drumPCMTriggeringService: DrumPCMTriggeringService) {
    this.audioContext = new AudioContext();
  }

  begin() {
    const self = this;
    // setup outputs
    this.audioOutputService.setup(this.audioContext, this.synthStream$);
    Note.configure(this.audioContext, this.audioOutputService.mainMixCompressor);
    this.midiNoteService.configure(this.audioContext, this.audioOutputService.mainMixCompressor);

    this.synthesisService.setup(this.audioContext, this.audioOutputService.mainMixCompressor);

    // setup drum service
    this.drumPCMTriggeringService.setup(this.audioContext,
      this.audioOutputService.mainMixCompressor,
      this.synthStream$);

    // setup inputs
    this.improvedMidiInputService.setup(this.synthStream$);

    // now send all note inputs coming from midi and non-midi sources (web page components, etc)
    this.synthStream$.subscribe(
      (message: SynthMessage) => {
        self.synthesisService.receiveMessage(message);
      }
    );
  }

  end() {
    // TODO - disconnect
  }

}
