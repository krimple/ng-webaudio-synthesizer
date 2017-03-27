import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  SynthNoteOff,
  SynthNoteOn, SynthMessage,
  WaveformChange
} from '../../../models';
import { MidiNoteService, Note } from './midi-note.service';
import {ClockTick, TriggerSample} from '../../../models/synth-note-message';
import { SynthStreamWrapper } from '../../synth-stream-wrapper';

@Injectable()
export class SynthesisService {
  private audioContext: AudioContext;
  private targetNode: AudioNode;
  // TODO - figure out how to modify on the fly (event?)
  private currentWaveForm = 'sawtooth';

  // object literal
  private notes: any;

  private synthStream$: Subject<SynthMessage>;

  constructor(private midiNoteService: MidiNoteService) {
  }

  public setup(synthStream$: Subject<SynthMessage>, audioContext: AudioContext, targetNode: AudioNode) {
    this.synthStream$ = synthStream$;
    this.audioContext = audioContext;
    this.targetNode = targetNode;
    this.setupSubscriptions();
  }

  // send a message to the synth upon receipt from outside world
  public receiveMessage(message: SynthMessage) {
    this.synthStream$.next(message);
  }


  private setupSubscriptions() {
    const self = this;
    this.synthStream$
      .filter((message: SynthMessage) => !(message instanceof TriggerSample))
      .subscribe(
        (message: SynthMessage) => {
          if (message instanceof ClockTick) {
              console.log('pulse!');
              self.clockTick();
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
