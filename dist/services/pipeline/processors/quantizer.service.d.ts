export declare class QuantizerService {
    private dataStream$;
    private outStream$;
    private streamBuffer;
    private subscription;
    private bpm;
    setDataStream(dataStream: any): void;
    setBPM(bpm: number): void;
    record(): void;
    stop(): void;
    playback(): void;
}
