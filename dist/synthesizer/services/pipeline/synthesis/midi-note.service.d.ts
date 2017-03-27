import { Subject } from 'rxjs';
import { SynthMessage } from '../../../models/synth-note-message';
export declare class MidiNoteService {
    private notes;
    setup(audioContext: AudioContext, synthStream$: Subject<SynthMessage>, audioBus: AudioNode): void;
    playNoteByMidiNoteNumber(noteNumber: any): void;
    stopNoteByMidiNoteNumber(noteNumber: any): void;
    playNoteByNoteValue(noteValueString: string): void;
    stopNoteByNoteValue(noteValueString: string): void;
}
export declare class Note {
    noteValues: string[];
    private frequency;
    static context: AudioContext;
    private static audioBus;
    private static synthStream$;
    private static midiNoteNumberCtr;
    private oscillator;
    private subscriptions;
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
    private createOscillator();
    noteOn(): void;
    noteOff(): void;
}
