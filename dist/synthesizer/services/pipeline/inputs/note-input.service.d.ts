import { Subject } from "rxjs/Subject";
import { SynthMessage } from '../../../models/synth-note-message';
export declare class NoteInputService {
    private synthStream$;
    setup(synthStream$: Subject<SynthMessage>): void;
    emitNote(noteValue: string): void;
}
