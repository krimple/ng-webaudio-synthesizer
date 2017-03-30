import { SynthMessage } from '../../../models';
import { Subject } from 'rxjs/Subject';
export declare class AudioOutputService {
    private synthStream$;
    private audioContext;
    mainMixCompressor: DynamicsCompressorNode;
    private mainMixFinalGain;
    private mainMixOutput;
    private messageSubscription;
    constructor(synthStream$: Subject<SynthMessage>, audioContext: any);
    begin(): void;
    setVolume(gain: number): void;
    end(): void;
}
