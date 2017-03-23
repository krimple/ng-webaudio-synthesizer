export declare class NoteTranslationService {
    private noteMappings;
    private scales;
    private defaultOctaves;
    constructor();
    getDefaultScaleFrequencies(octaves?: number[]): any[];
    getFrequency(note: string): number;
    getScaleFrequencies(scale: any, octaves?: number[]): any[];
}
