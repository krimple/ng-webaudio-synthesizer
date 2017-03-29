import { Subject } from 'rxjs/Subject';
import { Injectable, NgZone } from '@angular/core';

import {
  SynthNoteOff, SynthNoteOn,
  VolumeChange, SynthMessage,
  WaveformChange, TriggerSample
} from '../../../models';
import { Http } from '@angular/http';

declare const navigator: any;

export enum MidiServiceStates { ACTIVE, INACTIVE }

@Injectable()
export class MidiInputService {

  private synthStream$: Subject<SynthMessage>;
  private _state: MidiServiceStates = MidiServiceStates.INACTIVE;

  get state(): MidiServiceStates {
    return this._state;
  }

  private subscriptions: any[] = [];


  constructor(private zone: NgZone, private http: Http) { }

  setup(synthStream$: Subject<SynthMessage>) {
    this.synthStream$ = synthStream$;
  }

  // reference to pipeline's synth service stream
  beginMidiInput(devices = null) {
    if (this._state !== MidiServiceStates.INACTIVE) {
      console.log('Already listening for input. Stop the service first.');
      return;
    }
    const self = this;
    self.http.get('./assets/midi-device-mappings.json')
      .map((response) => response.json())
      .subscribe(
        (config: any[]) => {
          self.configMidiAccess(devices ? devices : config);
          console.log('midi service enabled');
          self._state = MidiServiceStates.ACTIVE;
        },
        (error) => {
          alert('Cannot find mappings file');
          console.log(error);
        });
  }

  elaborateDevices(): Promise<any[]> {
    return navigator.requestMIDIAccess()
      .then(
        (access) => {
          console.dir(access);
          const iterator = access.inputs.values();
          const devices = [];
          while (true) {
            const next = iterator.next();
            if (next.done) {
              break;
            }
            devices.push(next.value);
          }
          console.log('devices elaborated');
          console.dir(devices);
          return devices;
        });
  }

  private configMidiAccess(deviceMappings: any[]) {
    const self = this;
    this.elaborateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          const deviceInfo = deviceMappings.find((deviceMapping: any) => {
            return deviceMapping.value === device[deviceMapping.key];
          });
          if (deviceInfo) {
            self.subscribe(device, deviceInfo);
          }
        });
      });
  }


  private subscribe(device, deviceInfo) {
    const self = this;
    console.log(`opening connection to ${device.name}`);
    device.open()
      .then((subscription) => {
        console.log('subscribed!');
        console.dir(subscription);
        if (deviceInfo.type === 'midi') {
          self.startMusicNoteMessageDelivery(device, subscription);
        } else if (deviceInfo.type === 'percussion') {
          self.startPercussionDelivery(device, subscription, deviceInfo.percussion);
        }
      });
  }

  private startMusicNoteMessageDelivery(device, subscription) {
    const self = this;
    console.log(`subscribing to midi messages from ${device.name}`);
    subscription.onmidimessage = (data) => {
      self.processMusicNoteMessage(data);
    };
    this.subscriptions.push(subscription);
  }

  private startPercussionDelivery(device, subscription, instrument) {
    const self = this;
    console.log(`subscribing to percussion events for ${device.name} as instrument ${instrument}`);
    subscription.onmidimessage = (data) => {
      console.log('data incoming', data);
      self.processPercussionMessage(data);
    };

    this.subscriptions.push(subscription);
  }

  endMidiInput() {
    const self = this;
    if (this._state === MidiServiceStates.INACTIVE) {
      console.log('Midi Service not active. Only call this to stop an active state');
      return;
    }
    self.subscriptions.forEach((device) => {
      console.dir(device);
      if (device.state === 'connected') {
        device.close();
      }
    });
    self.subscriptions.length = 0;
    console.log('devices disconnected, MIDI input disabled.');
    self._state = MidiServiceStates.INACTIVE;
  }

  private processMusicNoteMessage(midiChannelMessage: any) {
    console.log(`recieved: ${midiChannelMessage.data[0]}: ${midiChannelMessage.data[1]}: ${midiChannelMessage.data[2]}`);
    switch (midiChannelMessage.data[0]) {
      case 144:
        this.synthStream$.next(new SynthNoteOn(midiChannelMessage.data[1]));
        break;
      case 128:
        this.synthStream$.next(new SynthNoteOff(midiChannelMessage.data[1]));
        break;
      case 176:
        // first pot on synth
        if (midiChannelMessage.data[1] === 7) {
          this.synthStream$.next(new VolumeChange(midiChannelMessage.data[2]));
        }
        break;
      case 137:
        // buttons on drum pad on synth
        if (midiChannelMessage.data[1] === 36) {
          this.synthStream$.next(new WaveformChange(0));
        } else if (midiChannelMessage.data[1] === 37) {
          this.synthStream$.next(new WaveformChange(1));
        } else if (midiChannelMessage.data[1] === 38) {
          this.synthStream$.next(new WaveformChange(2));
        }
        break;
      default:
        console.log('unknown midiChannelMessage',
          midiChannelMessage.data[0],
          midiChannelMessage.data[1],
          midiChannelMessage.data[2]);
    }
  }

  private processPercussionMessage(midiChannelMessage: any) {
    console.log(`recieved: ${midiChannelMessage.data[0]}: ${midiChannelMessage.data[1]}: ${midiChannelMessage.data[2]}`);
    if (midiChannelMessage.data[0] === 153 && midiChannelMessage.data[2] !== 0) {
      const velocity = midiChannelMessage.data[2];
      switch (midiChannelMessage.data[1]) {
        case 38:
          this.zone.run(() => {
            this.triggerSample('snare', velocity);
          });
          break;
        case 36:
          this.zone.run(() => {
            this.triggerSample('bass', velocity);
          });
          break;
        case 50:
          this.zone.run(() => {
            this.triggerSample('tom1', velocity);
          });
          break;
        case 51:
          this.zone.run(() => {
            this.triggerSample('tom2', velocity);
          });
          break;
        case 52:
          this.zone.run(() => {
            this.triggerSample('ride', velocity);
          });
          break;
        case 53:
          this.zone.run(() => {
            this.triggerSample('tom1', velocity);
          });
          break;

        default:
          console.log('unknown drum', midiChannelMessage.data[1]);
      }
    } else {
      console.log('unknown drumset midiChannelMessage',
        midiChannelMessage.data[0],
        midiChannelMessage.data[1],
        midiChannelMessage.data[2]);
    }
  }

  private triggerSample(name: string, velocity: number) {
    this.zone.run(() => {
      this.synthStream$.next(new TriggerSample(name, velocity));
    });
  }
}


