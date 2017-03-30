import { Subject } from 'rxjs';
import { SynthNoteMessage } from '../models/synth-note-message';
export declare class MidiNote {
    private synthStream$;
    private audioContext;
    private audioBus;
    private notes;
    constructor(synthStream$: Subject<SynthNoteMessage>, audioContext: any, audioBus: AudioNode);
}
export declare enum NoteState {
    PLAYING = 0,
    STOPPED = 1,
}
export declare class Note {
    noteValues: string[];
    private frequency;
    private synthStream$;
    private audioContext;
    private audioBus;
    private static midiNoteNumberCtr;
    private stopWatcher$;
    private subscriptions;
    private state;
    private midiNoteNumber;
    private waveform;
    private gainNode;
    private volume;
    private attack;
    private sustain;
    private decay;
    private release;
    constructor(noteValues: string[], frequency: number, synthStream$: Subject<SynthNoteMessage>, audioContext: AudioContext, audioBus: AudioNode);
    noteOn(): void;
}
