import { Subject } from 'rxjs';
import { SynthMessage } from '../../../models';
export declare class AudioOutputService {
    mainMixCompressor: DynamicsCompressorNode;
    private mainMixFinalGain;
    private mainMixOutput;
    private messageStream$;
    setup(audioContext: AudioContext, messageStream$: Subject<SynthMessage>): void;
    setVolume(gain: number): void;
}
