import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthMessage, SynthNoteMessage, SynthNoteOff, SynthNoteOn, TriggerSample } from './models/synth-note-message';
import { AudioOutput } from './support/audio-output';
import { MidiInput } from './support/midi-input';
import { DrumMachine } from './support/drum-machine';
import { Http } from '@angular/http';
import { MidiNote } from './support/midi-note';

@Injectable()
export class SynthesizerService {
  readonly synthStream$: Subject<SynthMessage> = new Subject<SynthMessage>();
  private audioContext: any;
  private audioOutput: AudioOutput;
  private midiInput: MidiInput;
  private midiNote: MidiNote;
  private drumMachine: DrumMachine;

  constructor(private http: Http, zone: NgZone) {
    this.audioContext = new AudioContext() || new window['webkitAudioContext']();
    this.audioOutput = new AudioOutput(this.synthStream$, this.audioContext);
    this.audioOutput.begin();
    this.midiNote = new MidiNote(this.synthStream$, this.audioContext, this.audioOutput.mainMixFinalGain);
    this.midiInput = new MidiInput(http, this.synthStream$, zone);
    this.midiInput.begin();
    this.drumMachine = new DrumMachine(this.synthStream$, this.audioContext, this.audioOutput.mainMixFinalGain, http);
    this.drumMachine.begin();
  }

  sendNote(note: number | string, duration: number = 300) {
    const self = this;
    this.synthStream$.next(new SynthNoteOn(note));
    setTimeout(() => {
      self.synthStream$.next(new SynthNoteOff(note));
    }, duration);
  }

  triggerSample(sample: string) {
    this.synthStream$.next(new TriggerSample(sample, 100));
  }
}
