import { Subject } from "rxjs/Subject";
import { SynthMessage } from '../../../models/synth-note-message';
export declare class NoteInputService {
    private enabled;
    private synthStream$;
    setup(synthStream$: Subject<SynthMessage>): void;
    begin(): void;
    emitNote(noteValue: string): void;
    end(): void;
}
