import { Subject } from 'rxjs/Subject';
import { SynthMessage } from '../../../models/synth-note-message';
export declare class NoteInputService {
    private enabled;
    private synthStream$;
    private noteTranslationService;
    setup(synthStream$: Subject<SynthMessage>): void;
    begin(): void;
    emitNoteByNoteNumber(noteValue: number): void;
    emitNoteByName(noteName: string): void;
    end(): void;
}
