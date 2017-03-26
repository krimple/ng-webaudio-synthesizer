import { PipelineService } from '../pipeline.service';
import { SynthStreamWrapper } from '../../synth-stream-wrapper';
export declare enum SequencerStates {
    STOPPED = 0,
    RECORDING = 1,
    PLAYING = 2,
}
export declare class SequencerService {
    private synthStreamWrapper;
    private streamBuffer;
    private subscription;
    private state;
    constructor(synthStreamWrapper: SynthStreamWrapper, pipelineService: PipelineService);
    record(): void;
    stop(): void;
    playback(): void;
    isPlaying(): boolean;
    isStopped(): boolean;
    isRecording(): boolean;
}
