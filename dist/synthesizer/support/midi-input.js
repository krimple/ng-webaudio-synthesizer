"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var synth_note_message_1 = require("../models/synth-note-message");
var MidiServiceStates;
(function (MidiServiceStates) {
    MidiServiceStates[MidiServiceStates["ACTIVE"] = 0] = "ACTIVE";
    MidiServiceStates[MidiServiceStates["INACTIVE"] = 1] = "INACTIVE";
})(MidiServiceStates = exports.MidiServiceStates || (exports.MidiServiceStates = {}));
var MidiInput = (function () {
    function MidiInput(http, synthStream$, zone) {
        this.http = http;
        this.synthStream$ = synthStream$;
        this.zone = zone;
        this.state = MidiServiceStates.INACTIVE;
    }
    MidiInput.prototype.begin = function () {
        var _this = this;
        this.elaborateDevices().then(function (devices) {
            _this.getConfiguration().then(function (config) {
                console.log('configuration fetched...');
                _this.state = MidiServiceStates.ACTIVE;
                return _this.beginMidiInput(config, devices);
            });
        });
    };
    MidiInput.prototype.elaborateDevices = function () {
        return new Promise(function (resolve, reject) {
            return navigator['requestMIDIAccess']()
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
                resolve(devices);
            }, function (error) {
                console.dir(error);
                reject("Midi Access request failed, " + error);
            });
        });
    };
    MidiInput.prototype.getConfiguration = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('./assets/midi-device-mappings.json')
                .map(function (response) { return response.json(); })
                .subscribe(function (config) {
                resolve(config);
            }, function (error) {
                console.dir(error);
                reject("Error loading mappings. " + error);
            });
        });
    };
    // reference to pipeline's synth service stream
    MidiInput.prototype.beginMidiInput = function (config, activeDevices) {
        var _this = this;
        if (activeDevices === void 0) { activeDevices = null; }
        return new Promise(function (resolve, reject) {
            activeDevices.forEach(function (activeDevice) {
                var deviceInfo = config.find(function (configEntry) {
                    console.log("comparing " + activeDevice[configEntry.key] + " to " + configEntry.value);
                    return activeDevice[configEntry.key] === configEntry.value;
                });
                if (deviceInfo) {
                    _this.subscribe(activeDevice, deviceInfo);
                }
            });
            if (_this.state === MidiServiceStates.INACTIVE) {
                reject('Not listening for input. Start the service first.');
            }
            else {
                resolve('success');
            }
        });
    };
    MidiInput.prototype.subscribe = function (device, deviceInfo) {
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
    MidiInput.prototype.startMusicNoteMessageDelivery = function (device, subscription) {
        var self = this;
        console.log("subscribing to midi messages from " + device.name);
        subscription.onmidimessage = function (data) {
            console.log("processing midi message " + data);
            self.processMusicNoteMessage(data);
        };
        // this.subscriptions.push(subscription);
    };
    MidiInput.prototype.startPercussionDelivery = function (device, subscription, instrument) {
        var self = this;
        console.log("subscribing to percussion events for " + device.name + " as instrument " + instrument);
        subscription.onmidimessage = function (data) {
            console.log('data incoming', data);
            self.processPercussionMessage(data);
        };
        // this.subscriptions.push(subscription);
    };
    MidiInput.prototype.processMusicNoteMessage = function (midiChannelMessage) {
        console.log("recieved: " + midiChannelMessage.data[0] + ": " + midiChannelMessage.data[1] + ": " + midiChannelMessage.data[2]);
        switch (midiChannelMessage.data[0]) {
            case 144:
                this.synthStream$.next(new synth_note_message_1.SynthNoteOn(midiChannelMessage.data[1]));
                break;
            case 128:
                this.synthStream$.next(new synth_note_message_1.SynthNoteOff(midiChannelMessage.data[1]));
                break;
            case 176:
                // first pot on synth
                if (midiChannelMessage.data[1] === 7) {
                    this.synthStream$.next(new synth_note_message_1.VolumeChange(midiChannelMessage.data[2]));
                }
                break;
            case 137:
                // buttons on drum pad on synth
                if (midiChannelMessage.data[1] === 36) {
                    this.synthStream$.next(new synth_note_message_1.WaveformChange(0));
                }
                else if (midiChannelMessage.data[1] === 37) {
                    this.synthStream$.next(new synth_note_message_1.WaveformChange(1));
                }
                else if (midiChannelMessage.data[1] === 38) {
                    this.synthStream$.next(new synth_note_message_1.WaveformChange(2));
                }
                break;
            default:
                console.log('unknown midiChannelMessage', midiChannelMessage.data[0], midiChannelMessage.data[1], midiChannelMessage.data[2]);
        }
    };
    MidiInput.prototype.processPercussionMessage = function (midiChannelMessage) {
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
    MidiInput.prototype.triggerSample = function (sample, velocity) {
        this.synthStream$.next(new synth_note_message_1.TriggerSample(sample, velocity));
    };
    return MidiInput;
}());
exports.MidiInput = MidiInput;
//# sourceMappingURL=midi-input.js.map