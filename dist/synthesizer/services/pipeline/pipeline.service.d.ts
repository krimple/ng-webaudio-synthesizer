import { ImprovedMidiInputService } from './inputs/improved-midi-input.service';
import { SynthesisService } from './synthesis/synthesis.service';
import { AudioOutputService } from './outputs/audio-output.service';
import { Subject } from 'rxjs/Subject';
import { DrumPCMTriggeringService } from './synthesis/drum-pcm-triggering.service';
import { MidiNoteService } from './synthesis/midi-note.service';
import { SynthMessage } from '../../models';
export declare class PipelineService {
    private midiNoteService;
    private improvedMidiInputService;
    private synthesisService;
    private audioOutputService;
    private drumPCMTriggeringService;
    private audioContext;
    readonly synthStream$: Subject<SynthMessage>;
    constructor(midiNoteService: MidiNoteService, improvedMidiInputService: ImprovedMidiInputService, synthesisService: SynthesisService, audioOutputService: AudioOutputService, drumPCMTriggeringService: DrumPCMTriggeringService);
    begin(): void;
    end(): void;
}
