import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { SynthMessage, SynthNoteOn } from '../../../models/synth-note-message';

@Injectable()
export class NoteInputService {

  private synthStream$: Subject<SynthMessage>;

  setup(synthStream$: Subject<SynthMessage>) {
    this.synthStream$ = synthStream$;
  }

  emitNote(noteValue: string) {
    this.synthStream$.next(new SynthNoteOn(noteValue));
  }
}