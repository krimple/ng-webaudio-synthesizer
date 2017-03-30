import { Http } from '@angular/http';
import { SynthMessage } from '../models/synth-note-message';
import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';
export declare enum MidiServiceStates {
    ACTIVE = 0,
    INACTIVE = 1,
}
export declare class MidiInput {
    private http;
    private synthStream$;
    private zone;
    private state;
    constructor(http: Http, synthStream$: Subject<SynthMessage>, zone: NgZone);
    begin(): void;
    private elaborateDevices();
    private getConfiguration();
    private beginMidiInput(config, activeDevices?);
    private subscribe(device, deviceInfo);
    private startMusicNoteMessageDelivery(device, subscription);
    private startPercussionDelivery(device, subscription, instrument);
    private processMusicNoteMessage(midiChannelMessage);
    private processPercussionMessage(midiChannelMessage);
    private triggerSample(sample, velocity);
}
