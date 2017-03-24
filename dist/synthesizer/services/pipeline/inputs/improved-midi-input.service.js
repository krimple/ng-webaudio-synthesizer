"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var models_1 = require("../../../models");
var http_1 = require("@angular/http");
var ImprovedMidiInputService = (function () {
    function ImprovedMidiInputService(zone, http) {
        this.zone = zone;
        this.http = http;
        this.subscriptions = [];
        this.subscribedDevices = [];
    }
    // reference to pipeline's synth service stream
    ImprovedMidiInputService.prototype.setup = function (synthStream$) {
        var self = this;
        // hold ref to synth note and control stream
        self.synthStream$ = synthStream$;
        // try to load device mapppings from root
        // TODO allow configuration of this file name somehow
        self.http.get('./assets/midi-device-mappings.json')
            .map(function (response) { return response.json(); })
            .subscribe(function (config) {
            self.configMidiAccess(config);
        }, function (error) {
            alert('Cannot find device mappings file');
            console.log(error);
        });
    };
    ImprovedMidiInputService.prototype.configMidiAccess = function (deviceMappings) {
        var self = this;
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
                var deviceInfo = deviceMappings.find(function (deviceMapping) {
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
                this.synthStream$.next(new models_1.SynthNoteOn(midiChannelMessage.data[1]));
                break;
            case 128:
                this.synthStream$.next(new models_1.SynthNoteOff(midiChannelMessage.data[1]));
                break;
            case 176:
                // first pot on synth
                if (midiChannelMessage.data[1] === 7) {
                    this.synthStream$.next(new models_1.VolumeChange(midiChannelMessage.data[2]));
                }
                break;
            case 137:
                // buttons on drum pad on synth
                if (midiChannelMessage.data[1] === 36) {
                    this.synthStream$.next(new models_1.WaveformChange(0));
                }
                else if (midiChannelMessage.data[1] === 37) {
                    this.synthStream$.next(new models_1.WaveformChange(1));
                }
                else if (midiChannelMessage.data[1] === 38) {
                    this.synthStream$.next(new models_1.WaveformChange(2));
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
            _this.synthStream$.next(new models_1.TriggerSample(name, velocity));
        });
    };
    ;
    return ImprovedMidiInputService;
}());
ImprovedMidiInputService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.NgZone, http_1.Http])
], ImprovedMidiInputService);
exports.ImprovedMidiInputService = ImprovedMidiInputService;
//# sourceMappingURL=improved-midi-input.service.js.map