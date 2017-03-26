import { Inject, Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { SynthMessage, SynthNoteOn } from '../../../models/synth-note-message';
import { SynthStreamWrapper } from '../../synth-stream-wrapper';

@Injectable()
export class NoteInputService {

  private enabled = false;
  private synthStream$: Subject<SynthMessage>;

  setup(synthStream$: Subject<SynthMessage>) {
    this.synthStream$ = synthStream$;
  }

  begin() {
    this.enabled = true;
  }

  emitNote(noteValue: string) {
    if (this.enabled) {
      this.synthStream$.next(new SynthNoteOn(noteValue));
    } else {
      console.log('cannot send notes. Service is disabled');
    }
  }

  end() {
    this.enabled = false;
  }
}