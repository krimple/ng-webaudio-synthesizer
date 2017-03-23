import { PipelineService } from '../pipeline.service';
export declare enum SequencerStates {
    STOPPED = 0,
    RECORDING = 1,
    PLAYING = 2,
}
export declare class SequencerService {
    private synthStream$;
    private streamBuffer;
    private subscription;
    private state;
    constructor(pipelineService: PipelineService);
    record(): void;
    stop(): void;
    playback(): void;
    isPlaying(): boolean;
    isStopped(): boolean;
    isRecording(): boolean;
}
