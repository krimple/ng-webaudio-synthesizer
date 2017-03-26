import { SynthMessage } from '../models/synth-note-message';
import { ReplaySubject } from 'rxjs';
export declare class SynthStreamWrapper {
    synthStream$: ReplaySubject<SynthMessage>;
    constructor();
}
