import { SynthNoteMessage } from '../models/synth-note-message';
import { Subject } from 'rxjs';
import { Http } from '@angular/http';
/**
 * Note, this helper class is NOT dependency injected. I had trouble with the factory
 * when trying to set up ngc to export the library for another Angular project to use,
 * so I gave up on trying. It's really not something I want exported from the main service anyway,
 * so consider it a helper class.
 */
export declare class DrumMachine {
    readonly synthStream$: Subject<SynthNoteMessage>;
    private audioContext;
    private audioBus;
    private http;
    private samples;
    constructor(synthStream$: Subject<SynthNoteMessage>, audioContext: AudioContext, audioBus: AudioNode, http: Http);
    begin(): void;
    loadSamples(): Promise<void>;
    private loadSample(sample);
    subscribeToSampleTriggerMessages(): void;
}
