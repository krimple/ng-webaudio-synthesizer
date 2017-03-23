import { Http } from '@angular/http';
import { SynthMessage } from '../../../models';
import { Subject } from 'rxjs';
export declare class DrumPCMTriggeringService {
    private http;
    samples: any;
    synthStream$: Subject<SynthMessage>;
    constructor(http: Http);
    setup(context: AudioContext, targetNode: AudioNode, synthStream$: Subject<SynthMessage>): void;
    subscribeTo(context: AudioContext, targetNode: AudioNode): void;
    loadSamples(context: AudioContext): Promise<void>;
    private loadSample(context, sample);
}
