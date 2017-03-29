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
import { Http } from '@angular/http';
export var MidiServiceStates;
(function (MidiServiceStates) {
    MidiServiceStates[MidiServiceStates["ACTIVE"] = 0] = "ACTIVE";
    MidiServiceStates[MidiServiceStates["INACTIVE"] = 1] = "INACTIVE";
})(MidiServiceStates || (MidiServiceStates = {}));
var MidiInputService = (function () {
    function MidiInputService(zone, http) {
        this.zone = zone;
        this.http = http;
        this._state = MidiServiceStates.INACTIVE;
        this.subscriptions = [];
    }
    Object.defineProperty(MidiInputService.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    MidiInputService.prototype.setup = function (synthStream$) {
        this.synthStream$ = synthStream$;
    };
    // reference to pipeline's synth service stream
    MidiInputService.prototype.beginMidiInput = function (devices) {
        if (devices === void 0) { devices = null; }
        if (this._state !== MidiServiceStates.INACTIVE) {
            console.log('Already listening for input. Stop the service first.');
            return;
        }
        var self = this;
        self.http.get('./assets/midi-device-mappings.json')
            .map(function (response) { return response.json(); })
            .subscribe(function (config) {
            self.configMidiAccess(devices ? devices : config);
            console.log('midi service enabled');
            self._state = MidiServiceStates.ACTIVE;
        }, function (error) {
            alert('Cannot find mappings file');
            console.log(error);
        });
    };
    MidiInputService.prototype.elaborateDevices = function () {
        return navigator.requestMIDIAccess()
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
            console.log('devices elaborated');
            console.dir(devices);
            return devices;
        });
    };
    MidiInputService.prototype.configMidiAccess = function (deviceMappings) {
        var self = this;
        this.elaborateDevices()
            .then(function (devices) {
            devices.forEach(function (device) {
                var deviceInfo = deviceMappings.find(function (deviceMapping) {
                    return deviceMapping.value === device[deviceMapping.key];
                });
                if (deviceInfo) {
                    self.subscribe(device, deviceInfo);
                }
            });
        });
    };
    MidiInputService.prototype.subscribe = function (device, deviceInfo) {
        var self = this;
        console.log("opening connection to " + device.name);
        device.open()
            .then(function (subscription) {
            console.log('subscribed!');
            console.dir(subscription);
            if (deviceInfo.type === 'midi') {
                self.startMusicNoteMessageDelivery(device, subscription);
            }
            else if (deviceInfo.type === 'percussion') {
                self.startPercussionDelivery(device, subscription, deviceInfo.percussion);
            }
        });
    };
    MidiInputService.prototype.startMusicNoteMessageDelivery = function (device, subscription) {
        var self = this;
        console.log("subscribing to midi messages from " + device.name);
        subscription.onmidimessage = function (data) {
            self.processMusicNoteMessage(data);
        };
        this.subscriptions.push(subscription);
    };
    MidiInputService.prototype.startPercussionDelivery = function (device, subscription, instrument) {
        var self = this;
        console.log("subscribing to percussion events for " + device.name + " as instrument " + instrument);
        subscription.onmidimessage = function (data) {
            console.log('data incoming', data);
            self.processPercussionMessage(data);
        };
        this.subscriptions.push(subscription);
    };
    MidiInputService.prototype.endMidiInput = function () {
        var self = this;
        if (this._state === MidiServiceStates.INACTIVE) {
            console.log('Midi Service not active. Only call this to stop an active state');
            return;
        }
        self.subscriptions.forEach(function (device) {
            console.dir(device);
            if (device.state === 'connected') {
                device.close();
            }
        });
        self.subscriptions.length = 0;
        console.log('devices disconnected, MIDI input disabled.');
        self._state = MidiServiceStates.INACTIVE;
    };
    MidiInputService.prototype.processMusicNoteMessage = function (midiChannelMessage) {
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
    MidiInputService.prototype.processPercussionMessage = function (midiChannelMessage) {
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
    MidiInputService.prototype.triggerSample = function (name, velocity) {
        var _this = this;
        this.zone.run(function () {
            _this.synthStream$.next(new TriggerSample(name, velocity));
        });
    };
    return MidiInputService;
}());
MidiInputService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NgZone, Http])
], MidiInputService);
export { MidiInputService };
//# sourceMappingURL=midi-input.service.js.map