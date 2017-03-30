import { NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthMessage } from './models/synth-note-message';
import { Http } from '@angular/http';
export declare class SynthesizerService {
    private http;
    readonly synthStream$: Subject<SynthMessage>;
    private audioContext;
    private audioOutput;
    private midiInput;
    private midiNote;
    private drumMachine;
    constructor(http: Http, zone: NgZone);
    sendNote(note: number | string, duration?: number): void;
    triggerSample(sample: string): void;
}
