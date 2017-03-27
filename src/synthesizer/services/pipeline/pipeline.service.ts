import { MidiInputService } from './inputs/midi-input.service';
import { SynthesisService } from './synthesis/synthesis.service';
import { AudioOutputService } from './outputs/audio-output.service';
import { Inject, Injectable } from '@angular/core';

// TODO see if this is a problem - otherwise revert to rxjs
import { Subject } from 'rxjs/Subject';

import { DrumPCMTriggeringService } from './synthesis/drum-pcm-triggering.service';
import { MidiNoteService, Note } from './synthesis/midi-note.service';
import { SynthMessage } from '../../models';
import { NoteInputService } from './inputs/note-input.service';
import { ReplaySubject } from 'rxjs';
import { DrumMachineInputService } from './inputs/drum-machine-input.service';

declare var AudioContext: any;

export enum PipelineServiceEvents { CONNECTED, DISCONNECTED }

@Injectable()
export class PipelineService {

  // TODO lost typings in latest version of angular/cli

  private audioContext: any;

  // this is ridiculous - I can't use a factory or value to
  // create this in an injector. Seems to be because it is
  // not able to introspect the right type metadata at runtime
  // so for NOW, I will configure streams manually
  private synthStream$ = new ReplaySubject<SynthMessage>();

  // TODO make protected by synthesized getter again
  readonly serviceEvents$ = new Subject<PipelineServiceEvents>();

  // imagine a world where the injector could actually inject
  // a typed subject that is configured by a factory!  2/3 of this
  // code would not need to exist!!! ng team needs to simplify
  // DI in Angular 2+ and make it easier to create injectable objects of generic types
  // OR, heck, I have a silly bug and hubris aplenty (which is likely)
  constructor(private midiNoteService: MidiNoteService,
              private midiInputService: MidiInputService,
              private drumMachineInputService: DrumMachineInputService,
              private noteInputService: NoteInputService,
              private synthesisService: SynthesisService,
              private audioOutputService: AudioOutputService,
              private drumPCMTriggeringService: DrumPCMTriggeringService) {
    this.audioContext = new AudioContext();
  }

  sendSynthMessage(message: SynthMessage) {
    this.synthStream$.next(message);
  }

  begin() {

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
  }

  end() {
    this.midiInputService.endMidiInput();
    this.noteInputService.end();
    this.audioOutputService.end();
  }

}
