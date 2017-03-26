import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';
import { SynthMessage } from '../../../models';
import { Http } from "@angular/http";
export declare enum MidiServiceStates {
    ACTIVE = 0,
    INACTIVE = 1,
}
export declare class MidiInputService {
    private zone;
    private http;
    private synthStream$;
    private _state;
    readonly state: MidiServiceStates;
    private subscriptions;
    constructor(zone: NgZone, http: Http);
    setup(synthStream$: Subject<SynthMessage>): void;
    beginMidiInput(devices?: any): void;
    elaborateDevices(): Promise<any[]>;
    private configMidiAccess(deviceMappings);
    private subscribe(device, deviceInfo);
    private startMusicNoteMessageDelivery(device, subscription);
    private startPercussionDelivery(device, subscription, instrument);
    endMidiInput(): void;
    private processMusicNoteMessage(midiChannelMessage);
    private processPercussionMessage(midiChannelMessage);
    private triggerSample(name, velocity);
}
