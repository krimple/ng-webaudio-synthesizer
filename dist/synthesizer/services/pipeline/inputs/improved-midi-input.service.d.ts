import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';
import { SynthMessage } from '../../../models';
import { Http } from "@angular/http";
export declare class ImprovedMidiInputService {
    private zone;
    private http;
    private synthStream$;
    private subscriptions;
    private subscribedDevices;
    constructor(zone: NgZone, http: Http);
    setup(synthStream$: Subject<SynthMessage>): void;
    configMidiAccess(deviceMappings: any[]): void;
    private subscribe(device, deviceInfo);
    private startMusicNoteMessageDelivery(device, subscription);
    private startPercussionDelivery(device, subscription, instrument);
    private stop();
    private processMusicNoteMessage(midiChannelMessage);
    private processPercussionMessage(midiChannelMessage);
    private triggerSample(name, velocity);
}
