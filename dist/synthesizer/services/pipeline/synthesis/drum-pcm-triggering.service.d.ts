import { Http } from '@angular/http';
import { SynthMessage } from '../../../models';
import { Subject } from 'rxjs';
export declare class DrumPCMTriggeringService {
    private http;
    private samples;
    private synthStream$;
    constructor(http: Http);
    setup(synthStream$: Subject<SynthMessage>, context: AudioContext, targetNode: AudioNode): void;
    subscribeTo(context: AudioContext, targetNode: AudioNode): void;
    loadSamples(context: AudioContext): Promise<void>;
    private loadSample(context, sample);
}
