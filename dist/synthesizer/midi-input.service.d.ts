import { Http } from '@angular/http';
export declare enum MidiServiceStates {
    ACTIVE = 0,
    INACTIVE = 1,
}
export declare class MidiInputService {
    private http;
    private state;
    constructor(http: Http);
    begin(): void;
    private elaborateDevices();
    private getConfiguration();
    private beginMidiInput(config, devices?);
}
