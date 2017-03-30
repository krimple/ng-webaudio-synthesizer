import { Http } from '@angular/http';
import {
  SynthMessage, SynthNoteOff,
  SynthNoteOn, TriggerSample, VolumeChange,
  WaveformChange
} from '../models/synth-note-message';
import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';

export enum MidiServiceStates { ACTIVE, INACTIVE }

export class MidiInput {
  private state: MidiServiceStates = MidiServiceStates.INACTIVE;

  constructor(private http: Http,
              private synthStream$: Subject<SynthMessage>,
              private zone: NgZone) { }

  begin() {
    this.elaborateDevices().then(
      (devices) => {
         this.getConfiguration().then(
           (config: any) => {
                console.log('configuration fetched...');
                this.state = MidiServiceStates.ACTIVE;
                return this.beginMidiInput(config, devices);
           });
      });
  }

  private elaborateDevices(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return navigator['requestMIDIAccess']()
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
            resolve(devices);
          },
         (error) => {
            console.dir(error);
            reject(`Midi Access request failed, ${error}`);
         });
    });
  }

  private getConfiguration(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/midi-device-mappings.json')
        .map((response) => response.json())
        .subscribe(
          (config: any[]) => {
            resolve(config);
          },
          (error) => {
            console.dir(error);
            reject(`Error loading mappings. ${error}`);
          });
    });
  }

  // reference to pipeline's synth service stream
  private beginMidiInput(config: any, activeDevices: any[] = null): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      activeDevices.forEach((activeDevice) => {
        const deviceInfo = config.find((configEntry: any) => {
          console.log(`comparing ${activeDevice[configEntry.key]} to ${configEntry.value}`);
          return activeDevice[configEntry.key] === configEntry.value;
        });
        if (deviceInfo) {
          this.subscribe(activeDevice, deviceInfo);
        }
      });
      if (this.state === MidiServiceStates.INACTIVE) {
        reject('Not listening for input. Start the service first.');
      } else {
        resolve('success');
      }
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
      console.log(`processing midi message ${data}`);
      self.processMusicNoteMessage(data);
    };
    // this.subscriptions.push(subscription);
  }

  private startPercussionDelivery(device, subscription, instrument) {
    const self = this;
    console.log(`subscribing to percussion events for ${device.name} as instrument ${instrument}`);
    subscription.onmidimessage = (data) => {
      console.log('data incoming', data);
      self.processPercussionMessage(data);
    };
    // this.subscriptions.push(subscription);
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

  private triggerSample(sample: string, velocity: number) {
    this.synthStream$.next(new TriggerSample(sample, velocity));
  }
}

