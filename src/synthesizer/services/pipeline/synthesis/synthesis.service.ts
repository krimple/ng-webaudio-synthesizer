import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  SynthNoteOff,
  SynthNoteOn, SynthMessage,
  WaveformChange
} from '../../../models';
import { MidiNoteService, Note } from './midi-note.service';
import {ClockTick, TriggerSample} from '../../../models/synth-note-message';

@Injectable()
export class SynthesisService {
  private audioContext: AudioContext;
  private targetNode: AudioNode;
  // TODO - figure out how to modify on the fly (event?)
  private currentWaveForm = 'sawtooth';

  // object literal
  private notes: any;

  // central switchboard observable / observer
  public noteStream$: Subject<SynthMessage>;

  // send a message to the synth upon receipt from outside world
  public receiveMessage(message: SynthMessage) {
    this.noteStream$.next(message);
  }

  constructor(private midiNoteService: MidiNoteService) {
  }

  public setup(audioContext: AudioContext, targetNode: AudioNode) {
    console.log(`audioContext is ${audioContext}`);
    this.audioContext = audioContext;
    this.targetNode = targetNode;
    this.noteStream$ = new Subject<SynthMessage>();
    // this.setupNotes(audioContext, targetNode);
    this.setupSubscriptions();
  }

  private setupSubscriptions() {
    const self = this;
    this.noteStream$
      .filter((message: SynthMessage) => !(message instanceof TriggerSample))
      .subscribe(
        (message: SynthMessage) => {
          if (message instanceof SynthNoteOn) {
            if (typeof message.note === 'number') {
              this.midiNoteService.playNoteByMidiNoteNumber(message.note);
            } else {
              this.midiNoteService.playNoteByNoteValue(message.note);
            }
            // TODO restore this
          } else if (message instanceof ClockTick) {
              console.log('pulse!');
              self.clockTick();
          } else if (message instanceof SynthNoteOff) {
            if (typeof message.note === 'number') {
              this.midiNoteService.stopNoteByMidiNoteNumber(message.note);
            } else {
              this.midiNoteService.stopNoteByNoteValue(message.note);
            }
          } else if (message instanceof WaveformChange) {
            console.log('new waveform value is ', message.waveForm);
            Note.changeWaveform(message);
          } else {
            console.log('unknown message', JSON.stringify(message));
          }
        }
      );
  }

  private clockTick() {
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    gain.gain.value = 0.2;
    oscillator.connect(gain);
    gain.connect(this.targetNode);
    oscillator.type = 'square';
    oscillator.frequency.value = 1000;
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 100);
  }
}
