import { Subject } from 'rxjs';
import {Injectable, NgZone} from '@angular/core';

import {
  SynthNoteOff, SynthNoteOn,
  VolumeChange, SynthMessage,
  WaveformChange, TriggerSample
} from '../../../models';
import { Http } from "@angular/http";

declare const navigator: any;

@Injectable()
export class ImprovedMidiInputService {

  private synthStream$: Subject<SynthMessage>;

  private subscriptions: any[] = [];
  private subscribedDevices: any[] = [];


  constructor(private zone: NgZone, private http: Http) { }
  // reference to pipeline's synth service stream

  setup(synthStream$: Subject<SynthMessage>) {
    const self = this;

    // hold ref to synth note and control stream
    self.synthStream$ = synthStream$;

    // try to load device mapppings from root
    // TODO allow configuration of this file name somehow
    self.http.get('./assets/midi-device-mappings.json')
      .map((response) => response.json())
      .subscribe(
        (config: any[]) => {
          self.configMidiAccess(config);
        },
        (error) => {
          alert('Cannot find device mappings file');
          console.log(error);
        });
  }

  configMidiAccess(deviceMappings: any[]) {
    const self = this;
    navigator.requestMIDIAccess()
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
          console.log('devices available:');
          console.dir(devices);

          devices.forEach((device) => {
            const deviceInfo = deviceMappings.find((deviceMapping: any) => {
             return deviceMapping.value === device[deviceMapping.key];
            });
            if (deviceInfo) {
              self.subscribedDevices.push(deviceInfo);
              self.subscribe(device, deviceInfo);
            }
          });
        },
        (error) => {
          console.error('no MIDI access!');
          throw new Error('no MIDI Access. Are you on Chrome?');
        }
      );
  }

  private subscribe(device, deviceInfo) {
    const self = this;
    console.log(`opening connection to ${device.name}`);
    device.open()
      .then((subscription) => {
        console.log('subscribed!');
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

  private stop() {
    const self = this;
    self.subscribedDevices.forEach((device) => {
      if (device.connected) {
        device.close();
      }
    });
    self.subscribedDevices.length = 0;
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
  };

  private triggerSample(name: string, velocity: number) {
    this.zone.run(() => {
      this.synthStream$.next(new TriggerSample(name, velocity));
    });
  };
}


