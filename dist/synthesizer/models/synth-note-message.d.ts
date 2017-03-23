export declare class SynthMessage {
    readonly action: string;
    constructor(action: any);
}
export declare class SynthNoteMessage extends SynthMessage {
    readonly note: string;
    constructor(note: any, action: any);
}
export declare class SynthNoteOn extends SynthNoteMessage {
    constructor(note: string);
}
export declare class SynthNoteOff extends SynthNoteMessage {
    constructor(note: string);
}
export declare class TriggerSample extends SynthMessage {
    instrument: string;
    velocity: number;
    constructor(instrument: string, velocity: number);
}
export declare class ClockTick extends SynthMessage {
    constructor();
}
export declare class SynthControlMessage extends SynthMessage {
}
export declare class VolumeChange extends SynthControlMessage {
    level: number;
    constructor(level: number);
}
export declare class WaveformChange extends SynthControlMessage {
    rawValue: number;
    waveForm: string;
    constructor(rawValue: number);
}
