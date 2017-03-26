import { Inject, Injectable } from '@angular/core';
import { SynthMessage, TriggerSample } from '../../../models/synth-note-message';
import { ReplaySubject, Subject } from 'rxjs';
export const enum DrumTrigger { SNARE, TOM1, TOM2, FLOOR_TOM, BASS_DRUM, HI_HAT_CLOSED, HI_HAT_OPEN, CRASH_CYMBAL, RIDE_CYMBAL }
@Injectable()
export class DrumMachineInputService {

  private synthStream$: Subject<SynthMessage>;

  setup(synthStream$: Subject<SynthMessage>) {
    this.synthStream$ = synthStream$;
  }

  playTrigger(trigger: DrumTrigger) {
    switch(trigger) {
      case DrumTrigger.BASS_DRUM:
        this.synthStream$.next(new TriggerSample('bass', 100));
        break;
      case DrumTrigger.SNARE:
        this.synthStream$.next(new TriggerSample('snare', 100));
        break;
      case DrumTrigger.TOM1:
        this.synthStream$.next(new TriggerSample('tom1', 100));
        break;
      case DrumTrigger.TOM2:
        this.synthStream$.next(new TriggerSample('tom2', 100));
        break;
      case DrumTrigger.HI_HAT_OPEN:
        this.synthStream$.next(new TriggerSample('hihat', 100));
        break;
      case DrumTrigger.HI_HAT_CLOSED:
        this.synthStream$.next(new TriggerSample('hihatclosed', 100));
        break;
      case DrumTrigger.CRASH_CYMBAL:
        this.synthStream$.next(new TriggerSample('crash', 100));
        break;
      case DrumTrigger.RIDE_CYMBAL:
        this.synthStream$.next(new TriggerSample('ride', 100));
        break;
      default:
        console.log('no soup for you, didn\'t pass a proper trigger type');
    }
  }

}