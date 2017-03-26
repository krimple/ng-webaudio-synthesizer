import { MidiInputService } from './inputs/midi-input.service';
import { SynthesisService } from './synthesis/synthesis.service';
import { AudioOutputService } from './outputs/audio-output.service';
import { Subject } from 'rxjs/Subject';
import { DrumPCMTriggeringService } from './synthesis/drum-pcm-triggering.service';
import { MidiNoteService } from './synthesis/midi-note.service';
import { SynthMessage } from '../../models';
import { NoteInputService } from './inputs/note-input.service';
import { DrumMachineInputService } from './inputs/drum-machine-input.service';
export declare enum PipelineServiceEvents {
    CONNECTED = 0,
    DISCONNECTED = 1,
}
export declare class PipelineService {
    private midiNoteService;
    private midiInputService;
    private drumMachineInputService;
    private noteInputService;
    private synthesisService;
    private audioOutputService;
    private drumPCMTriggeringService;
    private audioContext;
    private synthStream$;
    readonly serviceEvents$: Subject<PipelineServiceEvents>;
    constructor(midiNoteService: MidiNoteService, midiInputService: MidiInputService, drumMachineInputService: DrumMachineInputService, noteInputService: NoteInputService, synthesisService: SynthesisService, audioOutputService: AudioOutputService, drumPCMTriggeringService: DrumPCMTriggeringService);
    sendSynthMessage(message: SynthMessage): void;
    begin(): void;
    end(): void;
}
