var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NgZone } from '@angular/core';
import { SynthNoteOff, SynthNoteOn, VolumeChange, WaveformChange, TriggerSample } from '../../../models';
var ImprovedMidiInputService = (function () {
    function ImprovedMidiInputService(zone) {
        this.zone = zone;
        this.subscriptions = [];
        this.subscribedDevices = [];
        this.deviceMappings = [
            { key: 'name', value: 'MPK225 Port A', type: 'midi' },
            { key: 'name', value: 'KMC MultiPad', type: 'percussion' },
            { key: 'name', value: 'Adafruit Bluefruit LE Bluetooth', type: 'midi' },
            { key: 'name', value: 'iRig KEYS 25', type: 'midi' },
            { key: 'name', value: 'iRig KEYS 25 MIDI 1', type: 'midi' },
            { key: 'id', value: '167603758', type: 'percussion' },
            { key: 'name', value: 'Touch Board     ', type: 'midi' },
            { key: 'id', value: '-1614721547', type: 'percussion' },
            { key: 'id', value: '-1415071510', type: 'midi' },
            { key: 'id', value: '1999784255', type: 'percussion' },
            { key: 'id', value: '1852567680', type: 'percussion' },
            { key: 'name', value: 'Network Session 1', type: 'percussion' },
            { key: 'name', value: 'krimple-iphone Bluetooth', type: 'percussion' },
            { key: 'name', value: 'Cordova Bluetooth', type: 'percussion' },
            { key: 'id', value: '0C2F7210E6038867BE36D163C7D8C2457143C8FA73EC54BD8F32417669F0B2C6', type: 'percussion' }
        ];
    }
    // reference to pipeline's synth service stream
    ImprovedMidiInputService.prototype.setup = function (synthStream$) {
        var _this = this;
        var self = this;
        // hold ref to synth note and control stream
        self.synthStream$ = synthStream$;
        navigator.requestMIDIAccess()
            .then(function (access) {
            console.dir(access);
            var iterator = access.inputs.values();
            var devices = [];
            while (true) {
                var next = iterator.next();
                if (next.done) {
                    break;
                }
                devices.push(next.value);
            }
            console.log('devices available:');
            console.dir(devices);
            devices.forEach(function (device) {
                var deviceInfo = _this.deviceMappings.find(function (deviceMapping) {
                    return deviceMapping.value === device[deviceMapping.key];
                });
                if (deviceInfo) {
                    self.subscribedDevices.push(deviceInfo);
                    self.subscribe(device, deviceInfo);
                }
            });
        }, function (error) {
            console.error('no MIDI access!');
            throw new Error('no MIDI Access. Are you on Chrome?');
        });
    };
    ImprovedMidiInputService.prototype.subscribe = function (device, deviceInfo) {
        var self = this;
        console.log("opening connection to " + device.name);
        device.open()
            .then(function (subscription) {
            console.log('subscribed!');
            if (deviceInfo.type === 'midi') {
                self.startMusicNoteMessageDelivery(device, subscription);
            }
            else if (deviceInfo.type === 'percussion') {
                self.startPercussionDelivery(device, subscription, deviceInfo.percussion);
            }
        });
    };
    ImprovedMidiInputService.prototype.startMusicNoteMessageDelivery = function (device, subscription) {
        var self = this;
        console.log("subscribing to midi messages from " + device.name);
        subscription.onmidimessage = function (data) {
            self.processMusicNoteMessage(data);
        };
        this.subscriptions.push(subscription);
    };
    ImprovedMidiInputService.prototype.startPercussionDelivery = function (device, subscription, instrument) {
        var self = this;
        console.log("subscribing to percussion events for " + device.name + " as instrument " + instrument);
        subscription.onmidimessage = function (data) {
            console.log('data incoming', data);
            self.processPercussionMessage(data);
        };
        this.subscriptions.push(subscription);
    };
    ImprovedMidiInputService.prototype.stop = function () {
        var self = this;
        self.subscribedDevices.forEach(function (device) {
            if (device.connected) {
                device.close();
            }
        });
        self.subscribedDevices.length = 0;
    };
    ImprovedMidiInputService.prototype.processMusicNoteMessage = function (midiChannelMessage) {
        console.log("recieved: " + midiChannelMessage.data[0] + ": " + midiChannelMessage.data[1] + ": " + midiChannelMessage.data[2]);
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
                }
                else if (midiChannelMessage.data[1] === 37) {
                    this.synthStream$.next(new WaveformChange(1));
                }
                else if (midiChannelMessage.data[1] === 38) {
                    this.synthStream$.next(new WaveformChange(2));
                }
                break;
            default:
                console.log('unknown midiChannelMessage', midiChannelMessage.data[0], midiChannelMessage.data[1], midiChannelMessage.data[2]);
        }
    };
    ImprovedMidiInputService.prototype.processPercussionMessage = function (midiChannelMessage) {
        var _this = this;
        console.log("recieved: " + midiChannelMessage.data[0] + ": " + midiChannelMessage.data[1] + ": " + midiChannelMessage.data[2]);
        if (midiChannelMessage.data[0] === 153 && midiChannelMessage.data[2] !== 0) {
            var velocity_1 = midiChannelMessage.data[2];
            switch (midiChannelMessage.data[1]) {
                case 38:
                    this.zone.run(function () {
                        _this.triggerSample('snare', velocity_1);
                    });
                    break;
                case 36:
                    this.zone.run(function () {
                        _this.triggerSample('bass', velocity_1);
                    });
                    break;
                case 50:
                    this.zone.run(function () {
                        _this.triggerSample('tom1', velocity_1);
                    });
                    break;
                case 51:
                    this.zone.run(function () {
                        _this.triggerSample('tom2', velocity_1);
                    });
                    break;
                case 52:
                    this.zone.run(function () {
                        _this.triggerSample('ride', velocity_1);
                    });
                    break;
                case 53:
                    this.zone.run(function () {
                        _this.triggerSample('tom1', velocity_1);
                    });
                    break;
                default:
                    console.log('unknown drum', midiChannelMessage.data[1]);
            }
        }
        else {
            console.log('unknown drumset midiChannelMessage', midiChannelMessage.data[0], midiChannelMessage.data[1], midiChannelMessage.data[2]);
        }
    };
    ;
    ImprovedMidiInputService.prototype.triggerSample = function (name, velocity) {
        var _this = this;
        this.zone.run(function () {
            _this.synthStream$.next(new TriggerSample(name, velocity));
        });
    };
    ;
    return ImprovedMidiInputService;
}());
ImprovedMidiInputService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NgZone])
], ImprovedMidiInputService);
export { ImprovedMidiInputService };
//# sourceMappingURL=improved-midi-input.service.js.map