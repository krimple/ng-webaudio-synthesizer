import { Subject } from 'rxjs';
import { SynthMessage } from '../../../models';
import { MidiNoteService } from './midi-note.service';
export declare class SynthesisService {
    private midiNoteService;
    private audioContext;
    private targetNode;
    private currentWaveForm;
    private notes;
    noteStream$: Subject<SynthMessage>;
    receiveMessage(message: SynthMessage): void;
    constructor(midiNoteService: MidiNoteService);
    setup(audioContext: AudioContext, targetNode: AudioNode): void;
    private setupSubscriptions();
    private clockTick();
}
