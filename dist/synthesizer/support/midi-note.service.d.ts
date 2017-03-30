import { Subject } from 'rxjs';
import { SynthMessage } from '../../../models/synth-note-message';
export declare class MidiNoteService {
    private audioContext;
    private notes;
    constructor(audioContext: any);
    setup(synthStream$: Subject<SynthMessage>, audioBus: AudioNode): void;
}
export declare enum NoteState {
    PLAYING = 0,
    STOPPED = 1,
}
export declare class Note {
    noteValues: string[];
    private frequency;
    private static context;
    private static audioBus;
    private static synthStream$;
    private static midiNoteNumberCtr;
    private oscillator;
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
    static configure(context: AudioContext, synthStream: Subject<SynthMessage>, audioBus: AudioNode): void;
    constructor(noteValues: string[], frequency: number);
    noteOn(): void;
}
