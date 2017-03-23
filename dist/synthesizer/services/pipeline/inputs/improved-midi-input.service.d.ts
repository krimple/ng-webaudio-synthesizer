import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';
import { SynthMessage } from '../../../models';
export declare class ImprovedMidiInputService {
    private zone;
    private synthStream$;
    private subscriptions;
    private subscribedDevices;
    private deviceMappings;
    constructor(zone: NgZone);
    setup(synthStream$: Subject<SynthMessage>): void;
    private subscribe(device, deviceInfo);
    private startMusicNoteMessageDelivery(device, subscription);
    private startPercussionDelivery(device, subscription, instrument);
    private stop();
    private processMusicNoteMessage(midiChannelMessage);
    private processPercussionMessage(midiChannelMessage);
    private triggerSample(name, velocity);
}
