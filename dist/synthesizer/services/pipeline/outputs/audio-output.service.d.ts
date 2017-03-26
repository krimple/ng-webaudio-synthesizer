import { Subject } from 'rxjs';
import { SynthMessage } from '../../../models';
export declare class AudioOutputService {
    mainMixCompressor: DynamicsCompressorNode;
    private mainMixFinalGain;
    private mainMixOutput;
    private messageSubscription;
    private synthStream$;
    setup(synthStream$: Subject<SynthMessage>, audioContext: AudioContext): void;
    begin(): void;
    setVolume(gain: number): void;
    end(): void;
}
