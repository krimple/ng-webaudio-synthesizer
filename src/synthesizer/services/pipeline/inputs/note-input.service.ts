import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SynthMessage, SynthNoteOn } from '../../../models/synth-note-message';
import { NoteTranslationService } from '../processors/note-translation.service';

@Injectable()
export class NoteInputService {

  private enabled = false;
  private synthStream$: Subject<SynthMessage>;
  private noteTranslationService: NoteTranslationService;

  setup(synthStream$: Subject<SynthMessage>) {
    this.synthStream$ = synthStream$;
  }

  begin() {
    this.enabled = true;
  }

  emitNoteByNoteNumber(noteValue: number) {
    if (this.enabled) {
      this.synthStream$.next(new SynthNoteOn(noteValue));
    } else {
      console.log('cannot send notes. Service is disabled');
    }
  }

  emitNoteByName(noteName: string) {

    if (this.enabled) {
      this.synthStream$.next(new SynthNoteOn(noteName));
    }
  }
  end() {
    this.enabled = false;
  }
}
