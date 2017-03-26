import { Subject } from 'rxjs';
import { SynthMessage } from '../../../models';
import { MidiNoteService } from './midi-note.service';
export declare class SynthesisService {
    private midiNoteService;
    private audioContext;
    private targetNode;
    private currentWaveForm;
    private notes;
    private synthStream$;
    constructor(midiNoteService: MidiNoteService);
    setup(synthStream$: Subject<SynthMessage>, audioContext: AudioContext, targetNode: AudioNode): void;
    receiveMessage(message: SynthMessage): void;
    private setupSubscriptions();
    private clockTick();
}
