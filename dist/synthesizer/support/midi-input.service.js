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
var http_1 = require("@angular/http");
var MidiServiceStates;
(function (MidiServiceStates) {
    MidiServiceStates[MidiServiceStates["ACTIVE"] = 0] = "ACTIVE";
    MidiServiceStates[MidiServiceStates["INACTIVE"] = 1] = "INACTIVE";
})(MidiServiceStates = exports.MidiServiceStates || (exports.MidiServiceStates = {}));
var MidiInputService = (function () {
    function MidiInputService(http) {
        this.http = http;
        this.state = MidiServiceStates.INACTIVE;
    }
    MidiInputService.prototype.begin = function () {
        var _this = this;
        this.elaborateDevices().then(function (devices) {
            _this.getConfiguration().then(function (config) {
                return _this.beginMidiInput(config, devices);
            });
        });
    };
    MidiInputService.prototype.elaborateDevices = function () {
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
    MidiInputService.prototype.getConfiguration = function () {
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
    MidiInputService.prototype.beginMidiInput = function (config, devices) {
        var _this = this;
        if (devices === void 0) { devices = null; }
        return new Promise(function (resolve, reject) {
            if (_this.state !== MidiServiceStates.INACTIVE) {
                reject('Already listening for input. Stop the service first.');
            }
        });
    };
    return MidiInputService;
}());
MidiInputService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MidiInputService);
exports.MidiInputService = MidiInputService;
//# sourceMappingURL=midi-input.service.js.map