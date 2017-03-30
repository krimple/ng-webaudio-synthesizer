import { SynthMessage } from '../models';
import { Subject } from 'rxjs/Subject';
export declare class AudioOutput {
    private synthStream$;
    private mainMixCompressor;
    readonly mainMixFinalGain: GainNode;
    private mainMixOutput;
    private messageSubscription;
    constructor(synthStream$: Subject<SynthMessage>, audioContext: any);
    begin(): void;
    setVolume(gain: number): void;
    end(): void;
}
