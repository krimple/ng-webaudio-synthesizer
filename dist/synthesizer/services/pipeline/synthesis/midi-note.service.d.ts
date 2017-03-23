import { WaveformChange } from '../../../models/synth-note-message';
export declare class MidiNoteService {
    private notes;
    private audioBus;
    constructor();
    configure(audioContext: AudioContext, audioBus: AudioNode): void;
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
    private static controlPanelDataChanges$;
    private static waveform;
    private stopWatcher$;
    private gainNode;
    private startingVolume;
    private playingSince;
    static configure(context: AudioContext, audioBus: AudioNode): void;
    static changeWaveform(waveform: WaveformChange): void;
    constructor(noteValues: string[], frequency: number);
    private getNewOscillator();
    noteOn(): void;
    noteOff(): void;
}
export declare class ControlPanelData {
    waveForm: string;
    volume: number;
    constructor();
}
