export declare class SynthMessage {
}
export declare class SynthNoteMessage implements SynthMessage {
    readonly note: number | string;
    constructor(note: number | string);
}
export declare class SynthNoteOn extends SynthNoteMessage {
}
export declare class SynthNoteOff extends SynthNoteMessage {
}
export declare class TriggerSample implements SynthMessage {
    instrument: string;
    velocity: number;
    constructor(instrument: string, velocity: number);
}
export declare class ClockTick implements SynthMessage {
}
export declare class SynthControlMessage implements SynthMessage {
}
export declare class VolumeChange implements SynthControlMessage {
    level: number;
    constructor(level: number);
}
export declare class WaveformChange implements SynthControlMessage {
    rawValue: number;
    waveForm: string;
    constructor(rawValue: number);
}
