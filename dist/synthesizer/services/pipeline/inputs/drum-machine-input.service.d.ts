import { SynthMessage } from '../../../models/synth-note-message';
import { Subject } from 'rxjs';
export declare const enum DrumTrigger {
    SNARE = 0,
    TOM1 = 1,
    TOM2 = 2,
    FLOOR_TOM = 3,
    BASS_DRUM = 4,
    HI_HAT_CLOSED = 5,
    HI_HAT_OPEN = 6,
    CRASH_CYMBAL = 7,
    RIDE_CYMBAL = 8,
}
export declare class DrumMachineInputService {
    private synthStream$;
    setup(synthStream$: Subject<SynthMessage>): void;
    playTrigger(trigger: DrumTrigger): void;
}
