import { SynthMessage } from '../models/synth-note-message';
import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SynthStreamWrapper {
  synthStream$: ReplaySubject<SynthMessage> = new ReplaySubject<SynthMessage>();
  constructor() {
    console.log("creating SynthStreamWrapper");
  }
}
